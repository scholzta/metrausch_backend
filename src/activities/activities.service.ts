import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity, ActivityStatus } from './entities/activity.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  async findByOrganizer(userId: number): Promise<Activity[]> {
    return await this.activityRepository
      .createQueryBuilder('activity')
      .leftJoinAndSelect('activity.organizingUsers', 'user')
      .where('user.id = :userId', {userId })
      // .andWhere('activity.parentId IS NULL')
      .getMany();
  }

  async suggestNew(dto: any, user: User) {
    const activity = this.activityRepository.create({
      ...dto,
      status: ActivityStatus.PENDING,
      organizingUsers: [user],
    });
    return this.activityRepository.save(activity);
  }

  async suggestUpdate(id: number, dto: any, user: User) {
    const original = await this.activityRepository.findOne({ where: { id }, relations: ['organizingUsers'] });
    if (!original?.organizingUsers.find(u => u.id === user.id)) {
      throw new ForbiddenException('Not an organizer');
    }

    const suggestion = this.activityRepository.create({
      ...dto,
      parentId: id,
      status: ActivityStatus.PENDING,
      organizingUsers: original.organizingUsers,
    });
    return this.activityRepository.save(suggestion);
  }

  async approve(id: number) {
    const suggestion = await this.activityRepository.findOne({ where: { id } });
    if (!suggestion) {
      throw new NotFoundException(`Suggestion with ID ${id} not found`);
    }

    if (suggestion?.parentId) {
      const parent = await this.activityRepository.findOne({ where: { id: suggestion.parentId } });
      if (!parent) {
        throw new NotFoundException(`Original activity (Parent) not found`);
      }
      parent.name = suggestion.name;
      parent.organizerName = suggestion.organizerName;
      parent.description = suggestion.description;
      parent.location = suggestion.location;
      parent.contactPhone = suggestion.contactPhone;
      parent.contactEmail = suggestion.contactEmail;
      parent.status = ActivityStatus.APPROVED;

      await this.activityRepository.save(parent);
      await this.activityRepository.delete(id);
      return parent;
    } else {
      suggestion.status = ActivityStatus.APPROVED;
      return this.activityRepository.save(suggestion);
    }
  }

  async findPublic() {
    return this.activityRepository.find({ where: { status: ActivityStatus.APPROVED }})
  }

  async findPending() {
    return await this.activityRepository.find({
      where: { status: ActivityStatus.PENDING },
      relations: ['organizingUsers']
    });
  }

  async remove(id: number): Promise<void> {
    const activity = await this.activityRepository.findOne({ where: { id } });

    if (!activity) {
      throw new NotFoundException(`Activity or Suggestion with ID ${id} not found`);
    }

    if (!activity.parentId) {
      await this.activityRepository.delete({ parentId: id});
    }

    await this.activityRepository.remove(activity);
  }

  async findAllForAdmin() {
    return await this.activityRepository.find({
      order: { status: 'DESC', createdAt: 'DESC'},
      relations: ['organizingUsers']
    });
  }
}

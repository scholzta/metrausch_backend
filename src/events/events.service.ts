import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FestivalEvent } from './entities/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(FestivalEvent)
    private readonly eventRepository: Repository<FestivalEvent>,
  ) {}

  async create(dto: any) {
    const { startTime, endTime, stageId, bandId, activityId, customTitle } = dto;

    if (new Date(startTime) >= new Date(endTime)) {
      throw new BadRequestException('Start time must be before end time');
    }

    const collision = await this.eventRepository.createQueryBuilder('event')
      .where('event.stageId = :stageId', { stageId })
      .andWhere('(event.startTime < :endTime AND event.endTime > :startTime)', {
        startTime,
        endTime
      })
      .getOne();

    if (collision) {
      throw new BadRequestException(`Stage is already booked: ${collision.id}`);
    }

    const event = this.eventRepository.create({
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      customTitle,
      stage: { id: Number(stageId) },
      band: bandId ? {id: Number(bandId) } : null,
      activity: activityId ? {id: Number(activityId) } : null,
    } as any);

    const savedEvent = await this.eventRepository.save(event) as unknown as FestivalEvent;
    return this.findOne(savedEvent.id)
  }

  async getFullSchedule() {
    return await this.eventRepository.find({
      relations: ['stage', 'band', 'activity'],
      order: {
        startTime: 'ASC'
      },
    });
  }

  async findAll() {
    return await this.eventRepository.find({
      relations: ['stage', 'band', 'activity'],
    });
  }

  async findOne(id: number) {
    if (!id || isNaN(id)) {
      throw new BadRequestException('Invalid Event ID provided')
    }
    const event = await this.eventRepository.findOne({
      where: { id: id },
      relations: ['stage', 'band', 'activity'],
    });
    if (!event) throw new NotFoundException('FestivalEvent not found');
    return event;
  }

  async update(id: number, dto: any) {
    const event = await this.findOne(id);

    const updatedData = {
      ...dto,
      startTime: dto.startTime ? new Date(dto.startTime) : event.startTime,
      endTime: dto.endTime ? new Date(dto.endTime) : event.endTime,
      stage: dto.stageId ? {id: Number(dto.stageId)} : event.stage,
      band: dto.bandId ? { id: Number(dto.bandId)} : (dto.bandId === null ? null : event.band),
      activity: dto.activityId ? { id: Number(dto.activityId)} : (dto.activityId === null ? null : event.activity),
    };

    Object.assign(event, updatedData);
    await this.eventRepository.save(event);
    return this.findOne(id)
  }

  async remove(id: number) {
    const event = await this.findOne(id);
    return await this.eventRepository.remove(event);
  }
}

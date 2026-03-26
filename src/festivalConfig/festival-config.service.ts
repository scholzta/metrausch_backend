import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FestivalConfig } from "./festival-config.entity";
import { Repository } from "typeorm";
import { Stage } from "src/stages/entities/stage.entity";
import { Activity } from "src/activities/entities/activity.entity";
import { Ticket } from "src/tickets/entities/ticket.entity";
import { Band } from "src/bands/entities/band.entity";

@Injectable()
export class FestivalConfigService {
  constructor(
    @InjectRepository(FestivalConfig) private eventRepo: Repository<FestivalConfig>,
    @InjectRepository(Stage) private stageRepo: Repository<Stage>,
    @InjectRepository(Band) private bandRepo: Repository<Band>,
    @InjectRepository(Activity) private activityRepo: Repository<Activity>,
    @InjectRepository(Ticket) private ticketRepo: Repository<Ticket>,
  ) {};

  async getConfig() {
    const config = await this.eventRepo.findOne({ where: { id: 1 } });
    if (!config) throw new NotFoundException('Festival details not set')
    return config;
  }

  async updateConfig(updateData: Partial<FestivalConfig>) {
    let config = await this.eventRepo.findOne({ where: { id: 1 } });

    if (config) {
      Object.assign(config, updateData);
    } else {
      config = this.eventRepo.create({ ...updateData, id: 1 });
    }

    return this.eventRepo.save(config);
  }

  async deleteAll(entityType: string) {
    switch (entityType) {
      case 'events':
        return await this.eventRepo.deleteAll();
      case 'stages':
        return await this.stageRepo.deleteAll();
      case 'bands':
        return await this.bandRepo.deleteAll();
      case 'activities':
        return await this.activityRepo.deleteAll();
      case 'tickets':
        return await this.ticketRepo.deleteAll();
      default:
        throw new NotFoundException("Entity type doesn't exist")
    }
  }
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MediaRequestStatus } from '@server/constants/media';
import SeasonRequest from './SeasonRequest';

@Entity()
export class EpisodeRequest {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public episodeNumber: number;

  @Column({
    type: 'enum',
    enum: MediaRequestStatus,
    default: MediaRequestStatus.PENDING,
  })
  public status: MediaRequestStatus;

  @ManyToOne(() => SeasonRequest, (season) => season.episodes, {
    onDelete: 'CASCADE',
  })
  public season: SeasonRequest;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  constructor(init?: Partial<EpisodeRequest>) {
    Object.assign(this, init);
  }
}

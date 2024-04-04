import { IProduct } from 'src/core/enum';
import { EProductTalles } from 'src/core/interface';
import { Category } from 'src/modules/categories/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product implements IProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn()
  categoria: string;

  @Column({ length: 30, unique: true })
  codigo: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ default: 0 })
  precio: number;

  @Column({
    type: 'enum',
    enum: EProductTalles,
    default: EProductTalles.SMALL,
  })
  talle: EProductTalles;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

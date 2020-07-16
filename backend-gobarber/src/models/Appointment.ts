import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments') // decorator
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider: string;

    @Column('timestamp')
    date: Date;
}

export default Appointment;

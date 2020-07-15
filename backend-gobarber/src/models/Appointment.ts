import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments') // decorator
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider: string;

    @Column('timestamp with local time zone')
    date: Date;
}

export default Appointment;

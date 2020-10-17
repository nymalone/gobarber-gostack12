/* eslint-disable camelcase */
// DTO: data transfer objects
// vai definir qual é o formato dos dados que eu preciso pra criar um appointment

export default interface ICreateAppointmentDTO {
    provider_id: string;
    date: Date;
}

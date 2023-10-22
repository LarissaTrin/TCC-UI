export class Constants {
  static readonly tabName = ['Próximas', 'Atrasadas', 'Concluidas'];
  
  static readonly roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Leader' },
    { id: 3, name: 'User' }
  ];

  static readonly priority = ['Critical', 'High', 'Medium', 'Low'];
  
  static readonly DATE_FMT = 'dd/MM/yyyy';
  
  static readonly DATE_TIME_FMT = `${Constants.DATE_FMT} hh:mm a`;
}

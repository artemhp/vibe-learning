export interface TelegramMessage {
  message_id: number;
  from: {
    id: number;
    first_name: string;
    username?: string;
  };
  text: string;
  date: number;
}

export interface Member {
  id: string;
  name: string;
  introduction: string;
  industry: string;
  timestamp: string;
}

export interface Professional {
  id: string;
  name: string;
  expertise: string[];
  introduction: string;
  timestamp: string;
}

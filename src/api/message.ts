import request from '@/api/http';
import { messData } from '@/types/message'

export const messageData = ():Promise<messData> => request.get('/message/getmessage')

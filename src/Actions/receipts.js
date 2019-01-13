import Request from 'Lib/request';
import { decamelize } from '@ridi/object-case-converter';

export function createReceipt(homeID, data) {
  const url = `http://localhost:8000/home/${homeID}/receipts`
  const request = new Request();
  const formatData = decamelize(data, { recursive: true });

  // TODO: Do something here...
  // Save to state and/or redirect to dashboard
  return (dispatch) => {
    return request.post(url, formatData);
  }
}

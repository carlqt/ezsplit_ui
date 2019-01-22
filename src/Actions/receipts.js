import Request from 'Lib/request';
import { decamelize } from '@ridi/object-case-converter';
import { currentHouse } from 'Lib/helpers';

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

export function getReceipts(homeID) {
  const url = `http://localhost:8000/home/${homeID}/receipts`
  const request = new Request();

  return (dispatch) => {
    return request.xget(url)
      .then(resp => {
        dispatch({
          type: 'GET_RECEIPTS',
          data: resp.data,
        })
      })
  }
}

export async function getReceipt(receiptID) {
  const { id: homeID } = currentHouse();
  const url = `http://localhost:8000/home/${homeID}/receipts/${receiptID}`
  const request = new Request();

  return await request.xget(url)
}

export async function claimItems(data, receiptId) {
  try {
    const { id: homeID } = currentHouse();
    const url = `http://localhost:8000/home/${homeID}/receipts/${receiptId}/claim_items`
    const itemIds = data.map(item => item.id);
    const request = new Request();

    return await request.post(url, { items: itemIds });
  } catch (e) {
    console.log(e);
  }
}

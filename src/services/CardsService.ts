import { apiBase } from "../config";
import { ICard } from "../interfaces/CardInterfaces";
import { getToken } from "./UserService";


export const doGetCardById = async (cardId: string): Promise<{ error: string | null, result: ICard | null }> => {
  try {
    const response = await fetch(`${apiBase}/cards/${cardId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      return { error: data.message || 'Failed to fetch card', result: null };
    }
    return { error: null, result: data };
  } catch (err) {
    const errMessage = (err as Error).message;
    return { error: errMessage, result: null };
  }
};

// ---------------------------------------------------------------------------------------------------------

export const doGetAllCards = async (): Promise<{ error: string | null, result: ICard[] | null }> => {
  try {
    const response = await fetch(`${apiBase}/cards`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json()
    if (!response.ok) return { error: data, result: null }
    return { error: null, result: data }
  }
  catch (err) {
    const errMessage = (err as Error).message
    return { error: errMessage, result: null }
  }
}

// ---------------------------------------------------------------------------------------------------------

export const doGetMyCards = async (): Promise<{ error: string | undefined, result: ICard[] | undefined }> => {
  try {
    const token = await getToken()
    if (!token) return { error: 'No token found', result: undefined }
    const response = await fetch(`${apiBase}/cards/my-cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    });
    const data = await response.json()
    if (!response.ok) return { error: data, result: undefined }
    return { error: undefined, result: data }
  }
  catch (err) {
    const errMessage = (err as Error).message
    return { error: errMessage, result: undefined }
  }
}

// ---------------------------------------------------------------------------------------------------------

export const doToggleCardLike = async (cardId: string): Promise<{ error: string | null, result: any | null }> => {
  try {
    const token = await getToken();
    if (!token) {
      return { error: 'Authentication required. No token found.', result: null };
    }

    const response = await fetch(`${apiBase}/cards/${cardId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || 'An error occurred while toggling the like status.', result: null };
    }

    return { error: null, result: data };
  }
  catch (err) {
    const errMessage = (err as Error).message;
    return { error: errMessage, result: null };
  }
};

// ---------------------------------------------------------------------------------------------------------

export const doDeleteCard = async (cardId: string, bizNumber: number): Promise<{ error: string | null, result: any | null }> => {
  try {
    const token = await getToken();
    if (!token) {
      return { error: 'Authentication required. No token found.', result: null };
    }

    const response = await fetch(`${apiBase}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify({ bizNumber }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || 'Failed to delete card', result: null };
    }

    return { error: null, result: data };
  }
  catch (err) {
    const errMessage = (err as Error).message;
    return { error: errMessage, result: null };
  }
};

// ---------------------------------------------------------------------------------------------------------

export const doUpdateCard = async (cardId: string, cardData: ICard): Promise<{ error: string | null; result: ICard | null }> => {
  try {
    const token = await getToken();
    if (!token) {
      return { error: 'Authentication required. No token found.', result: null };
    }

    // Deep copy the cardData to avoid mutating the original object
    let cardDataCopy = JSON.parse(JSON.stringify(cardData));

    // Remove _id from image and address if they exist
    if (cardDataCopy.image && '_id' in cardDataCopy.image) {
      delete cardDataCopy.image._id;
    }
    if (cardDataCopy.address && '_id' in cardDataCopy.address) {
      delete cardDataCopy.address._id;
    }

    const response = await fetch(`${apiBase}/cards/${cardId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify(cardDataCopy),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || 'Failed to update card', result: null };
    }

    return { error: null, result: data };
  } catch (err) {
    const errMessage = (err as Error).message;
    return { error: errMessage, result: null };
  }
};

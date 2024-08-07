const sessionKey = 'swadesai-token';
export const baseURL = 'http://localhost:3001';
export const getUserId = () => {
  if (typeof window !== 'undefined') {
    const userData = JSON.parse(window.localStorage.getItem(sessionKey) || '{}');
    return userData ? userData.id : null;
  }
  return null;
};

export const getUserToken = () => {
  if (typeof window !== 'undefined') {
    const userData = JSON.parse(window.localStorage.getItem(sessionKey) || '{}');
    return userData ? userData.token : null;
  }
  return null;
};
export const getHeader = () => {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getUserToken()}`,
  };
};
export const updateLoggedInData = (data) => {
  console.log('data is ', data)
  localStorage.setItem(sessionKey, JSON.stringify(data));
};

export const getLoggedInUserDetails = (data) => {
  return JSON.parse(localStorage.getItem(sessionKey));
};

export const handleLogOut  = () =>{
  localStorage.removeItem(sessionKey);
  return ;
}


export function calculateDifference(targetDate) {
  const currentDate = new Date();
  const target = new Date(targetDate);

  // difference in milliseconds
  const differenceInMillis = currentDate -target ;

  // milliseconds to days and hours
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const millisecondsInHour = 60 * 60 * 1000;
  const millisecondsInMinutes =60 * 1000;

  const days = Math.floor(differenceInMillis / millisecondsInDay);
  const hours = Math.floor((differenceInMillis % millisecondsInDay) / millisecondsInHour);
  const minutes = Math.floor((differenceInMillis % millisecondsInDay) / millisecondsInMinutes);
  let toReturn = ''
  if (days >= 1) toReturn  = `${days} days`
  else if( hours >= 1) toReturn = `${hours} hours`
  else toReturn = `${minutes} mins`

  return toReturn;
}
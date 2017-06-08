const getTime = (timestamp) => {
  const date = new Date(timestamp);

  return {
    minutes: addFirstZero(date.getMinutes().toString()),
    seconds: addFirstZero(date.getSeconds().toString())
  };
};

const addFirstZero = (str) => (str.length === 1 ? `0` : ``) + str;

export default getTime;

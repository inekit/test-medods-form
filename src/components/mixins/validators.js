export const validateDate=(val) => {
    var [day, month, year] = val.split(".");
    var d = new Date(year, month - 1, day);

    return (
      d.getMonth() + 1 == month &&
      d.getDate() == day &&
      d.getFullYear() == year
    );
  }
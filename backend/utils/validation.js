/*eslint no-useless-escape: "off", no-await-in-loop :"off"*/

exports.validateEmail = (email) =>
  String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,4})(\.[a-z]{2,4})?$/);
/**
 * Regex email ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$
 */

exports.validateUsername = async (firstName, lastName, Model) => {
  const username =
    `${firstName.toLowerCase()} ${lastName.toLowerCase()}`.replace(/ /g, '-');
  let exist = false;
  let valideUsername = username;
  let prefix = 0;
  do {
    const user = await Model.findOne({ username: valideUsername });

    if (user) {
      prefix += 1;
      valideUsername = username + prefix;
      exist = true;
    } else {
      exist = false;
    }
  } while (exist);

  return valideUsername;
};

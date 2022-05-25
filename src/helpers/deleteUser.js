import axios from "axios";

export const deleteUser = async (id) => {
  try{
    const { data } = await axios.delete(`http://localhost:4141/api/users/${id}`);
    console.log('data', data)
    // return data.id;
  }
  catch (err) {
    console.log('Error: ', err)
  }
}
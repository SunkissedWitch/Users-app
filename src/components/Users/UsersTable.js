import { Spacer, Container, Table, Tooltip, Text } from "@nextui-org/react";
import { HomeButton } from "../Buttons/HomeButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { IconButton } from "../Buttons/IconButton";
import { EditIcon } from "../Icons/EditIcon";
import { DeleteIcon } from "../Icons/DeleteIcon";
import { DeleteUserModal } from "../Users/DeleteUserModal";
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";

const URL = process.env.REACT_APP_URL_API || 'http://localhost:4141/api';

const UsersTable = () => {
  
  const [ rows, setRows ] = useState([]);
  const [ visible, setVisible ] = useState(false);
  const [ currentId, setCurrentId ] = useState();

  const navigate = useNavigate();


  const toggleModal = () => {
    setVisible(!visible);
  }

  const deleteUserByID = (id) => {
    toggleModal();
    setCurrentId(id);
  }

  const fetchUsers = async () => {
    try{
      const { data } = await axios.get(`${URL}/users`);
      console.log('data', data)
      setRows(data);
    }
    catch (err) {
      console.log('Error: ', err)
    }
  }

  useEffect(() => {
    console.log('main effect')
    fetchUsers();
  }, []);
  
  const columns = [
    {
      key: "email",
      label: "Email"
    },
    {
      key: "age",
      label: "Age"
    },
    {
      key: "gender",
      label: "Gender"
    },
    {
      key: "department_id",
      label: "Department ID"
    },
    {
      key: "birthday",
      label: "Birthday"
    },
    {
      key: "edit"
    },
    {
      key: "delete"
    },
  ];

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "birthday":
        return(<Text i>{dayjs(cellValue).format('DD MMMM YYYY')} </Text>)
      case "edit":
        return(
          <Tooltip content="Edit user">
            <IconButton onClick={() => {
              console.log("Edit user", user.id);
              navigate (`/users/${user.id}`)}}>
              <EditIcon size={20} fill="#979797" />
            </IconButton>
          </Tooltip>
        );
      case "delete":
        return (
          <Tooltip
            content="Delete user"
            color="error"
            onClick={() => deleteUserByID(user.id)}
            // onClick={handler}
          >
            <IconButton>
              <DeleteIcon size={20} fill="#FF0080" />
            </IconButton>
          </Tooltip>
        );
      default:
        return <Text>{cellValue}</Text>;
    }
  };

  return (
    <Container css={{paddingTop: 40}}>
      <HomeButton title="back home" />
      <Spacer y={2}/>

      <Table
        striped
        selectionMode="single"
        aria-label="Table Users"
        css={{
          backgroundColor: "#fff",
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column key={column.key}>{column.label}</Table.Column>
          )}
        </Table.Header>
        <Table.Body items={rows}>
          {(item) => (
            <Table.Row key={item.id}>
              {(columnKey) => <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <DeleteUserModal id={currentId} visible={visible} setVisible={setVisible} fetchUsers={fetchUsers}/>
    </Container>
  )
}
export default UsersTable;

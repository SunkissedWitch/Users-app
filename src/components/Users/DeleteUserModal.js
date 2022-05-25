import { Modal, Row, Button, Text } from "@nextui-org/react";
import { deleteUser } from "../../helpers/deleteUser"

export const DeleteUserModal = (props) => {
  const { id, visible, setVisible, fetchUsers } = props;

  const handleDelete = async () => {
    await deleteUser(id);
    setVisible(false);
    fetchUsers();
  }

  return (
    <Modal
      closeButton
      blur
      animated={false}
      aria-labelledby="modal-title"
      open={visible}
      onClose={() => setVisible(false)}
    >
      <Modal.Header>
        <Text id="modal-title" size={18} b>
          Delete User
        </Text>
      </Modal.Header>
      <Modal.Body css={{textAlign: 'center'}}>
          <Text size={14}>Are your sure want to delete this user?</Text>
      </Modal.Body>
      <Modal.Footer>
        <Row justify="space-around">
          <Button auto flat color="error" onPress={() => setVisible(false)}>
            No  
          </Button>
          <Button auto onPress={handleDelete}>
            Yes
          </Button>
        </Row>
      </Modal.Footer>
    </Modal>
  );
}
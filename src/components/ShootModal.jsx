import moment from "moment";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Modal } from "semantic-ui-react";

export const ShootModal = ({ elapsedTime, setNextLevel }) => {
  const [toggle, setToggle] = useState(true);

  return (
    <Modal
      size={"small"}
      open={toggle}
      onClose={() => {
        setToggle(false);
        toast.dismiss();
      }}
    >
      <Modal.Header>Wow! Congratulations</Modal.Header>
      <Modal.Content>
        <p>Completed in {moment(elapsedTime).format("mm[min] ss[s]")}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          secondary
          onClick={() => {
            setToggle(false);
            setNextLevel();
            toast.dismiss();
          }}
        >
          Next Level
        </Button>
        <Button
          positive
          onClick={() => {
            setToggle(false);
            toast.dismiss();
          }}
        >
          Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

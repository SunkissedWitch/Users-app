import { Spacer, Container, Table, Text, Tooltip, Button, Row } from "@nextui-org/react";
import { HomeButton } from "../Buttons/HomeButton";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import { EyeIcon } from "../Icons/EyeIcon";
import { IconButton } from "../Buttons/IconButton";


const URL = process.env.REACT_APP_URL_API || 'http://localhost:4141/api';

export const TableProjects = () => {
  const [ rows, setRows ] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try{
      const { data } = await axios.get(`${URL}/projects`);
      console.log('data', data)
      setRows(data);
    }
    catch (err) {
      console.log('Error: ', err)
    }
  }

  useEffect(() => {
    console.log('main effect')
    fetchData();
  }, []);

  const columns = [
    {
      key: "upwork_job_title",
      label: "Job Title",
      width: "20%"
    },
    {
      key: "upwork_engagement",
      label: "Engagement",
      width: "17%"
    },
    {
      key: "upwork_hourly_budget",
      label: "Hourly Budget",
      width: "15%"
    },
    {
      key: "upwork_user_name",
      label: "User Name",
      width: "20%"
    },
    {
      key: "upwork_created_on",
      label: "Created on",
      width: "13%"
    },
    {
      key: "manager",
      label: "Manager",
      width: "10%"
    },
    {
      key: "upwork_description",
      label: "Details",
      width: "5%"
    }
  ];

  const renderCell = (job, columnKey) => {
    const cellValue = job[columnKey];
    switch (columnKey) {
      case "upwork_created_on":
        return (<Text size={14} i>{dayjs(cellValue).format('DD MMMM YYYY')} </Text>)
      case "upwork_job_id":
        return (<Text size={14} b>{cellValue}</Text>)
        case "upwork_job_title":
        return (
          <Tooltip trigger="hover" content={cellValue}>
            <Text
              size={14}
              css={{
              textOverflow: "ellipsis",
              width: "200px",
              overflow: "hidden",
              whiteSpace: "nowrap"}}>
                {cellValue}
            </Text>
          </Tooltip>)
      case "upwork_description":
        return (
          <Row justify="center">
            <IconButton onClick={() => navigate(`/projects/${job.upwork_job_id}`)}>
              <EyeIcon size={20} fill="#979797" />
            </IconButton>  
          </Row>
          )
      case "manager":
        const ifNameIsNull = job.first_name ? job.first_name : ""
        const ifSurnameIsNull = job.last_name ? job.last_name : ""
        return (
          <Text size={14}>{`${ifNameIsNull} ${ifSurnameIsNull}`}</Text>
        )
      default:
        return <Text size={14}>{cellValue}</Text>;
    }
  };
  return (
    <Container css={{paddingTop: 40}}>
      <HomeButton title="back home" />
      <Spacer y={2}/>

      <Table
        striped
        selectionMode="single"
        aria-label="Table Projects"
        css={{
          backgroundColor: "#fff",
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column key={column.key} css={{width: `${column.width}`}}>{column.label}</Table.Column>
          )}
        </Table.Header>
        <Table.Body items={rows}>
          {(item) => (
            <Table.Row key={item.upwork_job_id}>
              {(columnKey) => <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>}
            </Table.Row>
          )}
        </Table.Body>
        {/* <Table.Pagination
          shadow
          noMargin
          align="center"
          rowsPerPage={3}
          onPageChange={(page) => console.log({ page })}
        /> */}
      </Table>
    </Container>
  )
}
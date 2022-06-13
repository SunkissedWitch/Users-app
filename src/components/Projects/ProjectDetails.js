import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Text,
  Card,
  Divider,
  Spacer,
  Grid,
  Row,
} from "@nextui-org/react";
import dayjs from "dayjs";

const URL = process.env.REACT_APP_URL_API || "http://localhost:4141/api";

export const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState({
    upwork_created_on: "",
    upwork_job_id: "",
    upwork_user_name: "",
    upwork_job_title: "",
    upwork_engagement: "",
    upwork_hourly_budget: "",
    upwork_description: "",
    great_budget: false
  });

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${URL}/projects/${id}`);
      console.log("data", data);
      setProject(data);

      if (data.upwork_hourly_budget) {
        const splitedBudget = data.upwork_hourly_budget.split('-');
        const [ lowPrice, highPrice ] = splitedBudget;

        if(addEmoji(lowPrice) || addEmoji(highPrice)) {
          setProject({
            ...data,
            great_budget: true
          })
        }
      }

    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const {
    upwork_created_on,
    upwork_user_name,
    upwork_job_title,
    upwork_engagement,
    upwork_hourly_budget,
    upwork_description,
  } = project;

  const addEmoji = (str) => {
    const trimedPrice = str.replaceAll(/[^0-9.]/g, '')
    console.log('trimedPrice', trimedPrice)
    const parsedNum = Number.parseFloat(trimedPrice)
    console.log('parsedNum', parsedNum)
    return parsedNum >= 40
  }

console.log('project', project)
  return (
    <Container
      css={{
        display: "flex",
        flexDirection: "column",
        justify: "center",
        alignItems: "center",
      }}
    >
      <Spacer y={2} />
      <Card lgmax="true">
        <Card.Header>
          <Text h3>{upwork_job_title}</Text>
        </Card.Header>
        <Divider />
        <Card.Body css={{ padding: 0 }}>
          <Grid.Container>
            <Grid xs={9}>
              <Container>
                <Spacer y={1} />
                <Text h5>Description:</Text>
                <Spacer y={1} />
                <Text
                  className="card-description"
                  size={14}
                  blockquote
                  css={{ lineHeight: 2.3 }}
                >
                  {upwork_description}
                </Text>
                <Spacer y={2} />
              </Container>
            </Grid>
            <Grid xs={3} css={{ borderLeft: "1px solid #e0e0e0" }}>
              <Container>
                <Spacer y={1} />
                <Text small color="grey">
                  Created on: {dayjs(upwork_created_on).format("DD MMMM YYYY")}
                </Text>
                <Spacer y={1} />
                <Divider />
                <Spacer y={1} />

                <Text size={14} css={{lineHeight: 2}}>UpWork Engagement: </Text>
                <Text b>{upwork_engagement}</Text>
                <Spacer y={1} />

                <Text size={14} css={{lineHeight: 2}}>Hourly budget: </Text>
                <Text b>{upwork_hourly_budget}</Text>
                {project.great_budget && <Row css={{my: 4}}>🤑🤑🤑</Row>}
                <Spacer y={1} />
                <Divider />
                <Spacer y={1} />

                <Text blockquote>
                  Submited for: <Text b>{upwork_user_name}</Text>
                </Text>
                <Spacer y={1} />
              </Container>
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>
    </Container>
  );
};

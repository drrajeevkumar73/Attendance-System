import React from "react";
import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface LeaveApplicationEmailProps {
  username: string;
  userid: string;
  leflenghth: number;
}

export default function LeaveApplicationEmail({
  username,
  userid,
  leflenghth,
}: LeaveApplicationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Leave Application Submission</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Section>
        <Row>
          <Heading as="h2">Hello Admin,</Heading>
        </Row>

        <Row>
          <Text>
            My name is {username}. I have submitted a leave application for your
            review. Kindly consider and approve it at your earliest convenience.
          </Text>
        </Row>
        <Row>
          <Text>Thank you 🌹.</Text>
        </Row>
        <Row>
          <Text>Total Leaves Approved by Admin This Month: {leflenghth}</Text>
        </Row>
        <Row>
          <Text>
            You can view your application status by clicking the button below:
          </Text>
        </Row>

        <Row>
          <Button
            href={`https://attendance-system-khaki.vercel.app/admin-leav-aprove/${userid}`}
            style={{
              backgroundColor: "#007bff",
              color: "#ffffff",
              padding: "10px 20px",
              borderRadius: "5px",
              textDecoration: "none",
              display: "inline-block",
              fontWeight: "bold",
            }}
          >
            View Application
          </Button>
        </Row>

        <Row>
          <Text>
            If you did not submit this application, please ignore this email.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}

import {
  Html,
  Head,
  Preview,
  Heading,
  Row,
  Section,
} from "@react-email/components";
import { formatRelativeMonthDate, formatRelativeTime } from "@/lib/utils";

// Define styles object at the top
const styles = {
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center" as const,
    fontWeight: "bold" as const,
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center" as const,
  },
};

interface LeaveApplicationEmailProps {
  userdata: any;
  username: string;
}

export default function SendTelelcaller({
  userdata,
  username,
}: LeaveApplicationEmailProps) {
  return (
    <Html lang="en">
      <Head>
        <title>{`${username} Report`}</title>
      </Head>
      <Preview> {username} Telecaller Report</Preview>

      <Section style={{ padding: "20px", backgroundColor: "#f8f8f8" }}>
        <Row>
          <Heading as="h2" style={{ textAlign: "center", color: "#333" }}>
            {username} Telecaller Report
          </Heading>
        </Row>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#ffffff",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#ff6600", color: "#fff" }}>
              <th style={styles.th}>Date</th>
              <th style={styles.th}> Data Dial</th>
              <th style={styles.th}>Incoming</th>
              <th style={styles.th}>Outgoing</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>WhatsApp/Text</th>
              <th style={styles.th}>Appt</th>
              <th style={styles.th}>Fees</th>
              <th style={styles.th}>New Patient</th>
              <th style={styles.th}>Enquiry</th>
              <th style={styles.th}>Time</th>
            </tr>
          </thead>
          <tbody>
            {userdata.map((v: any) => (
              <tr key={v.id}>
                <td style={styles.td}>
                  {formatRelativeMonthDate(v.createdAt)}
                </td>
                <td style={styles.td}>{v.task1}</td>
                <td style={styles.td}>{v.task2}</td>
                <td style={styles.td}>{v.task3}</td>
                <td style={styles.td}>{Number(v.task2) + Number(v.task3)}</td>
                <td style={styles.td}>{v.task4}</td>
                <td style={styles.td}>{v.task5}</td>
                <td style={styles.td}>{v.task6}</td>
                <td style={styles.td}>{v.task7}</td>
                <td style={styles.td}>{v.task8}</td>
                <td style={styles.td}>{formatRelativeTime(v.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </Html>
  );
}

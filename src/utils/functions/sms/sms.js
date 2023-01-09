import smpp from "smpp";
import { config } from "dotenv";

config();

export const send_message = (phone_number, message) => {
  let session = smpp.connect({
    //19999 is not ssl port ssl port is 29999 but he's just not working
    url: "smpp://smpp.smsapi.pl:19999",
  });

  let pdu = new smpp.PDU("bind_transceiver", {
    system_id: process.env.SMS_SYSTEM_ID,
    password: process.env.SMS_SYSTEM_PASSWORD,
  });

  session.on(pdu, (status) => {
    if (status.command_status === 0) {
      session.submit_sm(
        {
          destination_addr: phone_number,
          short_message: message,
        },
        function (pdu) {
          if (pdu.command_status === 0) {
            // Message successfully sent
            console.log(pdu.message_id);
            return "Sended successfully";
          }
        }
      );
    }
  });
};

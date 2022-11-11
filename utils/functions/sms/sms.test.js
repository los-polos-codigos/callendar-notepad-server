import smpp from "smpp";

describe("SMS tests", () => {
  let session;

  beforeAll(async () => {
    session = await smpp.connect({
      //19999 is not ssl port ssl port is 29999 but he's just not working
      url: "smpp://smpp.smsapi.pl:19999",
    });
  });

  afterAll(async () => {
    await session.close();
  });

  it("SMS-health", async () => {
    try {
      let pdu = new smpp.PDU("enquire_link");
      await session.send(pdu, (res) => {
        expect(res.connect).toBe("generic_nack");
      });
    } catch (err) {
      throw err;
    }
  });
});

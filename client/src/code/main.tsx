import "normalize.css";
import "../css/main.css";

import * as ReactDOM from "react-dom";
import * as React from "react";

import * as IMAP from "./IMAP";
import * as Contacts from "./Contacts";
import BaseLayout from "./components/BaseLayout";

const baseComponent = ReactDOM.render(<BaseLayout />, document.body);

baseComponent.state.showHidePleaseWait(true);

//Call API to fetch Data
async function getMailboxes() {
  //Call API
  const imapWorker: IMAP.Worker = new IMAP.Worker();
  const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();
  mailboxes.forEach((inMailbox) => {
    //Add Mailbox to State
    baseComponent.state.addMailboxToList(inMailbox);
  });
}

getMailboxes().then(function () {
  async function getContacts() {
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    const contacts: Contacts.IContact[] = await contactsWorker.listContacts();
    contacts.forEach((inContact) => {
      baseComponent.state.addContactToList(inContact);
    });
  }
  getContacts().then(() => baseComponent.state.showHidePleaseWait(false));
});

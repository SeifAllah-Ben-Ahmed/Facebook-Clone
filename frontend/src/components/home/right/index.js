import { Dots, NewRoom, Search } from "../../../svg";
import Contact from "./Contact";
import "./style.css";
export default function RightHome() {
  const color = "#65676b";
  return (
    <div className="right_home">
      <h3 className="heading">Sponsored</h3>
      <div className="splitter1"></div>
      <div className="contacts_wrap">
        <div className="contacts_header">
          <div className="contacts_header_left">Contacts</div>
          <div className="contacts_header_right">
            <div className="contact_circle hover1">
              <NewRoom color={color} />
            </div>
            <div className="contact_circle hover1">
              <Search color={color} />
            </div>
            <div className="contact_circle hover1">
              <Dots color={color} />
            </div>
          </div>
        </div>
        <div className="contact_List">
          <Contact />
        </div>
      </div>
    </div>
  );
}

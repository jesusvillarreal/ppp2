import React from "react";
import ReactDOM from "react-dom";
import ExtensionsHeader from "../extensionsHeader";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  CustomInput,
} from "reactstrap";
import { Search } from "react-feather";
import XLSX from "xlsx";
import * as FileSaver from "file-saver";

class Export extends React.Component {
  state = {
    data: [
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        website: "hildegard.org",
        movil: "999412278",
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        website: "anastasia.net",
        movil: "980422678",
      },
      {
        id: 3,
        name: "Clementine Bauch",
        username: "Samantha",
        email: "Nathan@yesenia.net",
        website: "ramiro.info",
        movil: "994507892",
      },
      {
        id: 4,
        name: "Patricia Lebsack",
        username: "Karianne",
        email: "Julianne.OConner@kory.org",
        website: "kale.biz",
        movil: "997456659",
      },
      {
        id: 5,
        name: "Chelsey Dietrich",
        username: "Kamren",
        email: "Lucio_Hettinger@annie.ca",
        website: "demarco.info",
        movil: "999047759",
      },
      {
        id: 6,
        name: "Mrs. Dennis Schulist",
        username: "Leopoldo_Corkery",
        email: "Karley_Dach@jasper.info",
        website: "ola.org",
        movil: "993756615",
      },
      {
        id: 7,
        name: "Kurtis Weissnat",
        username: "Elwyn.Skiles",
        email: "Telly.Hoeger@billy.biz",
        website: "elvis.io",
        movil: "994445793",
      },
      {
        id: 8,
        name: "Nicholas Runolfsdottir V",
        username: "Maxime_Nienow",
        email: "Sherwood@rosamond.me",
        website: "jacynthe.com",
        movil: "999076915",
      },
      {
        id: 9,
        name: "Glenna Reichert",
        username: "Delphine",
        email: "Chaim_McDermott@dana.io",
        website: "conrad.com",
        movil: "990746697",
      },
      {
        id: 10,
        name: "Clementina DuBuque",
        username: "Moriah.Stanton",
        email: "Rey.Padberg@karina.biz",
        website: "ambrose.net",
        movil: "929487533",
      },
    ],
    filteredData: [],
    value: "",
    modal: false,
    fileName: "",
    fileFormat: "xlsx",
  };

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleFilter = (e) => {
    let data = this.state.data;
    let filteredData = [];
    let value = e.target.value;
    this.setState({ value });
    if (value.length) {
      filteredData = data.filter((col) => {
        let startsWithCondition =
          col.name.toLowerCase().startsWith(value.toLowerCase()) ||
          col.email.toLowerCase().startsWith(value.toLowerCase()) ||
          col.movil.toLowerCase().startsWith(value.toLowerCase()) ||
          // col.website.toLowerCase().startsWith(value.toLowerCase()) ||
          col.id.toString().toLowerCase().startsWith(value.toLowerCase());

        let includesCondition =
          col.name.toLowerCase().includes(value.toLowerCase()) ||
          col.email.toLowerCase().includes(value.toLowerCase()) ||
          col.movil.toLowerCase().includes(value.toLowerCase()) ||
          col.id.toString().toLowerCase().includes(value.toLowerCase());

        if (startsWithCondition) return startsWithCondition;
        else if (!startsWithCondition && includesCondition)
          return includesCondition;
        else return null;
      });
      this.setState({ value, filteredData });
    }
  };

  handleExport = () => {
    this.toggleModal();
    let table = ReactDOM.findDOMNode(this.tableRef);
    let bookType = this.state.fileFormat.length
      ? this.state.fileFormat
      : "xlsx";
    let wb = XLSX.utils.table_to_book(table, { sheet: "Sheet JS" });
    let wbout = XLSX.write(wb, { bookType, bookSST: true, type: "binary" });

    const s2ab = (s) => {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    };
    let file =
      this.state.fileFormat.length && this.state.fileFormat.length
        ? `${this.state.fileName}.${this.state.fileFormat}`
        : this.state.fileName.length
        ? `${this.state.fileName}.xlsx`
        : this.state.fileFormat.length
        ? `excel-sheet.${this.state.fileFormat}`
        : "excel-sheet.xlsx";

    return FileSaver.saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      file
    );
  };

  render() {
    let array = this.state.value ? this.state.filteredData : this.state.data;
    let renderTableData = array.map((col) => {
      return (
        <tr key={col.id}>
          <td>{col.name}</td>
          <td>{col.email}</td>
          <td>{col.movil}</td>
          <td>{col.id}</td>
        </tr>
      );
    });
    return (
      <React.Fragment>
        <ExtensionsHeader
          title="Exportar contactos"
          subTitle="Descarga en un archivo Excel (xlsx, csv o txt) todos los contactos registrados. "
        />
        <Row className="export-component">
          <Col sm="12">
            <Card>
              <CardBody>
                <Row>
                  <Col sm="12">
                    <div className="d-flex justify-content-between flex-wrap">
                      <Button.Ripple color="primary" onClick={this.toggleModal}>
                        Exportar
                      </Button.Ripple>
                      <div className="filter position-relative has-icon-left">
                        <Input
                          type="text"
                          value={this.state.value}
                          onChange={(e) => this.handleFilter(e)}
                        />
                        <div className="form-control-position">
                          <Search size={15} />
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col sm="12">
                    <Table
                      innerRef={(el) => (this.tableRef = el)}
                      className="table-hover-animation mt-2"
                      responsive
                    >
                      <thead>
                        <tr>
                          <th>Nombres</th>
                          <th>Email</th>
                          <th>Celular</th>
                          <th>Mensajes recibidos</th>
                        </tr>
                      </thead>
                      <tbody>{renderTableData}</tbody>
                    </Table>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggleModal}>Exportar en Excel</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Input
                type="text"
                value={this.state.fileName}
                onChange={(e) => this.setState({ fileName: e.target.value })}
                placeholder="Nombre del archivo"
              />
            </FormGroup>
            <FormGroup>
              <CustomInput
                type="select"
                id="selectFileFormat"
                name="customSelect"
                value={this.state.fileFormat}
                onChange={(e) => this.setState({ fileFormat: e.target.value })}
              >
                <option>xlsx</option>
                <option>csv</option>
                <option>txt</option>
              </CustomInput>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleExport}>
              Export
            </Button>
            <Button color="flat-danger" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Export;

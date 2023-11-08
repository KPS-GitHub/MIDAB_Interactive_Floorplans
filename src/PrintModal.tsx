import * as React from 'react'

import {Button} from '@blueprintjs/core'
import {InputGroup} from '@blueprintjs/core'

interface IPrintModalProps {
    toggleShowPrintModal: { (): void };
    printBrochure: { (firstName: string, lastName: string, email: string, phone: string): void };
}

interface IPrintModalState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export class PrintModal extends React.Component<IPrintModalProps, IPrintModalState> {

    constructor(props: IPrintModalProps) {
      super(props);
      
      this.state = {firstName: "", lastName: "", email: "", phone: ""};
    }

    handleCancelClick() {
        this.props.toggleShowPrintModal();
    }

    handlePrintClick() {
        const {firstName, lastName, email, phone} = this.state;
        this.props.printBrochure(firstName, lastName, email, phone);
        this.handleCancelClick();
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>)  {
      this.setState({
        ...this.state,
        [e.target.name]: e.target.value,
      })
    }

    render() {
      const {firstName, lastName, email, phone} = this.state;
 
        return <React.Fragment>
             <div id="myModal" className="modal">
           <div className="modal-content">
           <Button text="X" className='close' onClick={() => this.handleCancelClick()}></Button>
            <h3 className='modalheadertext'>Print</h3>
<hr/>
   <p>First Name</p>
   <div className='bp3-input-group'>
      <input type="text" placeholder="First Name" name="firstName" value={firstName} onChange={(e) => this.handleChange(e)} className="bp3-input" />
   </div>
   <p>Last Name</p>
   <div className='bp3-input-group'>
      <input type="text" placeholder="Last Name" name="lastName" value={lastName} onChange={(e) => this.handleChange(e)} className="bp3-input" />
   </div>
   <p>E-Mail</p>
   <div className='bp3-input-group'>
      <input type="text" placeholder="E-Mail" name="email" value={email} onChange={(e) => this.handleChange(e)} className="bp3-input" />
   </div>
   <p>Phone Number</p>
   <div className='bp3-input-group'>
      <input type="text" placeholder="Phone Number" name="phone" value={phone} onChange={(e) => this.handleChange(e)} className="bp3-input" />
   </div>
   <hr/>
   <Button text="Cancel" className='modalbutton' onClick={() => this.handleCancelClick()} ></Button>
   <Button intent="primary" text="Print" className='modalbutton' onClick={() => this.handlePrintClick()}></Button>

 </div>
 </div>
        </React.Fragment>;
    }
}
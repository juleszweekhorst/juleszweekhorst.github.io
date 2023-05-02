import React from 'react';
import { useForm } from '@formcarry/react';
import { Button, Container, Form } from 'react-bootstrap';
import './styles/styles.scss';
 
function MyFormcarry() {
  // Call the "useForm" hook in your function component
  const {state, submit} = useForm({
    id: 'o9e_1bsYN'
  });
 
  // Success message
  if (state.submitted) {
    return <div>Thank you! We received your submission.</div>;
  }
 
  return (
    <Container className="rounded py-1 my-3 border b-l shadow-sm dp-01">
      <h2 style={{fontWeight:"700"}}>Contact</h2>
      <p>Your voice is important to us! All feedback, suggestions and issue reports are appreciated.</p>
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control id="email" type="email" name="email" placeholder="email (optional)"/>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="message">Message</Form.Label>
          <Form.Control as="textarea" rows={3} id="message" name="message" placeholder="message" className='mb-3'/>
        </Form.Group>
        <Button type="submit" className='mb-2 align-self-right'>Send</Button>
      </Form>
    </Container>
  );
}

export default MyFormcarry

import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

export default function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const res = await axios.get('http://localhost:5000/api/tickets');
      setTickets(res.data);
    };
    fetchTickets();
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Judul</th>
          <th>Status</th>
          <th>Prioritas</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket.id}>
            <td>{ticket.id}</td>
            <td>{ticket.title}</td>
            <td>{ticket.status}</td>
            <td>{ticket.priority}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
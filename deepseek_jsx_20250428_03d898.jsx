const updateStatus = async (id, newStatus) => {
  try {
    await axios.put(
      `http://localhost:5000/api/tickets/${id}/status`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    alert('Status berhasil diupdate!');
  } catch (error) {
    console.error(error);
  }
};

// Di dalam tabel:
<select onChange={(e) => updateStatus(ticket.id, e.target.value)}>
  <option value="open">Open</option>
  <option value="pending">Pending</option>
  <option value="resolved">Resolved</option>
</select>
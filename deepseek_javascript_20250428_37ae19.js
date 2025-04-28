// Update status tiket (hanya admin/teknisi)
app.put('/api/tickets/:id/status', authenticateToken, (req, res) => {
  if (req.user.role === 'user') return res.sendStatus(403);
  
  const { status } = req.body;
  db.query(
    'UPDATE tickets SET status = ? WHERE id = ?',
    [status, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send('Status updated!');
    }
  );
});
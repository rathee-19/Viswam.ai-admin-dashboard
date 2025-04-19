import React, { useRef, useState, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import TopCard from './TopCard';
import { topCardsData } from 'data/topCardsData';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Papa from 'papaparse';

const visualizationOptions = [
  { id: 'table', label: 'Show Data Table' },
  { id: 'bar', label: 'Bar Chart' },
  { id: 'line', label: 'Line Chart' },
  { id: 'summary', label: 'Summary Statistics' },
];

const TopCards = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [vizDialogOpen, setVizDialogOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleImportClick = () => fileInputRef.current?.click();

  const processData = (dataArr: any[]) => {
    if (dataArr.length === 0) return;
    const cols = Object.keys(dataArr[0]);
    setHeaders(cols);
    const converted = dataArr.map(row => {
      const newRow: any = { ...row };
      cols.forEach(col => {
        const raw = row[col];
        const num = parseFloat(raw as string);
        if (typeof raw === 'string' && !isNaN(num)) {
          newRow[col] = num;
        }
      });
      return newRow;
    });
    setParsedData(converted);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      if (file.name.endsWith('.json')) {
        try {
          const json = JSON.parse(content);
          const arr = Array.isArray(json) ? json : [json];
          processData(arr);
        } catch {
          console.error('Invalid JSON file');
        }
      } else {
        Papa.parse(content, {
          header: true,
          skipEmptyLines: true,
          complete: results => processData(results.data as any[]),
        });
      }
      // reset file input to allow re-upload of same file
      input.value = '';
      // reset previous selection
      setSelectedOption(null);
      setVizDialogOpen(false);
      // open options dialog
      setDialogOpen(true);
    };
    reader.readAsText(file);
  };

  const handleOptionSelect = (id: string) => {
    setSelectedOption(id);
    setDialogOpen(false);
    setVizDialogOpen(true);
  };
  const handleDialogClose = () => setDialogOpen(false);
  const handleVizClose = () => setVizDialogOpen(false);

  const summaryStats = useMemo(() => {
    const stats: Record<string, any> = {};
    headers.forEach(key => {
      const vals = parsedData
        .map(d => d[key])
        .filter(v => typeof v === 'number');
      if (!vals.length) return;
      const sum = vals.reduce((s, v) => s + v, 0);
      const mean = sum / vals.length;
      const sorted = [...vals].sort((a, b) => a - b);
      const median = sorted[Math.floor(sorted.length / 2)];
      const sq = vals.map(v => (v - mean) ** 2);
      const std = Math.sqrt(sq.reduce((a, b) => a + b, 0) / vals.length);
      stats[key] = { count: vals.length, mean, median, min: sorted[0], max: sorted[sorted.length-1], std };
    });
    return stats;
  }, [parsedData, headers]);

  const numericFields = useMemo(
    () => headers.filter(h => parsedData.some(d => typeof d[h] === 'number')),
    [parsedData, headers]
  );

  return (
    <>
      <Grid container spacing={2}>
        {topCardsData.filter(item => item.id !== 5).map(item => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={2.3}>
            <TopCard data={item} />
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4} lg={2.3}>
          <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <UploadFileIcon fontSize="large" />
              <Typography variant="subtitle1" gutterBottom>Import Data</Typography>
              <Button variant="contained" onClick={handleImportClick} startIcon={<UploadFileIcon />}>Upload</Button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".csv, .xlsx, .xls, .json"
                onChange={handleFileChange}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Options Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="xs">
        <DialogTitle>Select Visualization</DialogTitle>
        <DialogContent>
          <List>
            {visualizationOptions.map(opt => (
              <ListItem key={opt.id} disablePadding>
                <ListItemButton onClick={() => handleOptionSelect(opt.id)}>
                  <ListItemText primary={opt.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>

      {/* Visualization Dialog */}
      <Dialog open={vizDialogOpen} onClose={handleVizClose} fullWidth maxWidth="md">
        <DialogTitle>{visualizationOptions.find(o => o.id === selectedOption)?.label}</DialogTitle>
        <DialogContent>
          {selectedOption === 'table' && (
            <Table size="small">
              <TableHead>
                <TableRow>{headers.map(h => <TableCell key={h}>{h}</TableCell>)}</TableRow>
              </TableHead>
              <TableBody>
                {parsedData.map((row, i) => (
                  <TableRow key={i} hover>
                    {headers.map(h => <TableCell key={h}>{row[h]}</TableCell>)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {selectedOption === 'bar' && numericFields.length > 0 && (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={parsedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={headers[0]} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={numericFields[0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
          {selectedOption === 'line' && numericFields.length > 0 && (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={parsedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={headers[0]} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={numericFields[0]} />
              </LineChart>
            </ResponsiveContainer>
          )}
          {selectedOption === 'summary' && (
            Object.entries(summaryStats).map(([field, s]) => (
              <Card key={field} sx={{ mb: 2, p: 2 }}>
                <Typography variant="h6">{field}</Typography>
                <Typography>Count: {s.count}</Typography>
                <Typography>Mean: {s.mean.toFixed(2)}</Typography>
                <Typography>Median: {s.median}</Typography>
                <Typography>Min: {s.min}</Typography>
                <Typography>Max: {s.max}</Typography>
                <Typography>Std Dev: {s.std.toFixed(2)}</Typography>
              </Card>
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleVizClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TopCards;

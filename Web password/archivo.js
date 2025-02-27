import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { UploadCloud, Trash, Download } from 'lucide-react';

export default function FileStorageApp() {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    localStorage.setItem('storedFiles', JSON.stringify(updatedFiles.map(f => f.name)));
  };

  const handleDelete = (fileName) => {
    const updatedFiles = files.filter(file => file.name !== fileName);
    setFiles(updatedFiles);
    localStorage.setItem('storedFiles', JSON.stringify(updatedFiles.map(f => f.name)));
  };

  const handleDownload = (file) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-10 flex items-center justify-center">
      <Card className="w-full max-w-3xl p-10 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl">
        <CardContent>
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-white text-center mb-6">
            🗂️ Almacenamiento de Archivos
          </motion.h1>

          <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-white p-10 rounded-2xl text-white text-lg hover:bg-white/20 transition">
            <UploadCloud size={48} className="mb-4" />
            Arrastra o haz click para subir archivos .RAR
            <input type="file" className="hidden" onChange={handleFileUpload} accept=".rar" multiple />
          </label>

          <div className="mt-8 space-y-4">
            {files.map((file, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/10 rounded-xl p-4 flex justify-between items-center text-white">
                <span>{file.name}</span>
                <div className="flex gap-4">
                  <Button variant="ghost" onClick={() => handleDownload(file)}>
                    <Download size={20} />
                  </Button>
                  <Button variant="ghost" className="text-red-400" onClick={() => handleDelete(file.name)}>
                    <Trash size={20} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

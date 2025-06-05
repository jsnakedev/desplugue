import React, { useState } from 'react';
import { PenTool, Trash2, Edit2, Save, Plus, Calendar } from 'lucide-react';
import Card, { CardBody, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useData } from '../contexts/DataContext';
import { JournalEntry } from '../types';

const ReflectPage: React.FC = () => {
  const { journalEntries, addJournalEntry, deleteJournalEntry, updateJournalEntry } = useData();
  const [newEntry, setNewEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState<JournalEntry['mood']>('neutral');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');

  const handleAddEntry = () => {
    if (newEntry.trim()) {
      addJournalEntry({
        date: new Date().toISOString(),
        content: newEntry.trim(),
        mood: selectedMood,
      });
      setNewEntry('');
      setSelectedMood('neutral');
    }
  };

  const startEditing = (entry: JournalEntry) => {
    setEditingId(entry.id);
    setEditingContent(entry.content);
    setSelectedMood(entry.mood || 'neutral');
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingContent('');
  };

  const saveEdit = (id: string) => {
    const entry = journalEntries.find(e => e.id === id);
    if (entry && editingContent.trim()) {
      updateJournalEntry({
        ...entry,
        content: editingContent.trim(),
        mood: selectedMood,
      });
    }
    setEditingId(null);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <section className="mb-8">
        <h1 className="text-3xl font-serif mb-3">Refletir</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Um espaço para registrar seus pensamentos e momentos de presença.
        </p>
      </section>

      <Card>
        <CardBody>
          <h2 className="text-xl font-medium mb-4">Nova reflexão</h2>
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Como você está se sentindo?
              </label>
              <div className="flex justify-between max-w-xs">
                <button 
                  className={`text-2xl p-2 rounded-full ${selectedMood === 'terrible' ? 'bg-neutral-100 dark:bg-neutral-800' : ''}`}
                  onClick={() => setSelectedMood('terrible')}
                >
                  😞
                </button>
                <button 
                  className={`text-2xl p-2 rounded-full ${selectedMood === 'bad' ? 'bg-neutral-100 dark:bg-neutral-800' : ''}`}
                  onClick={() => setSelectedMood('bad')}
                >
                  😕
                </button>
                <button 
                  className={`text-2xl p-2 rounded-full ${selectedMood === 'neutral' ? 'bg-neutral-100 dark:bg-neutral-800' : ''}`}
                  onClick={() => setSelectedMood('neutral')}
                >
                  😐
                </button>
                <button 
                  className={`text-2xl p-2 rounded-full ${selectedMood === 'good' ? 'bg-neutral-100 dark:bg-neutral-800' : ''}`}
                  onClick={() => setSelectedMood('good')}
                >
                  🙂
                </button>
                <button 
                  className={`text-2xl p-2 rounded-full ${selectedMood === 'great' ? 'bg-neutral-100 dark:bg-neutral-800' : ''}`}
                  onClick={() => setSelectedMood('great')}
                >
                  😄
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                O que você descobriu hoje estando mais presente?
              </label>
              <textarea
                className="input min-h-[120px]"
                placeholder="Escreva seus pensamentos aqui..."
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
              />
            </div>
            
            <Button
              variant="primary"
              onClick={handleAddEntry}
              disabled={!newEntry.trim()}
              icon={<Plus size={16} />}
            >
              Adicionar Reflexão
            </Button>
          </div>
        </CardBody>
      </Card>

      <section>
        <h2 className="text-xl font-medium mb-4">Suas reflexões</h2>
        
        {journalEntries.length === 0 ? (
          <Card>
            <CardBody className="text-center py-8">
              <p className="text-neutral-500 dark:text-neutral-400 mb-2">
                Você ainda não tem reflexões registradas.
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Comece compartilhando como se sente hoje.
              </p>
            </CardBody>
          </Card>
        ) : (
          <div className="space-y-4">
            {journalEntries.map((entry) => (
              <Card key={entry.id}>
                <CardBody>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <Calendar size={16} className="text-neutral-500 dark:text-neutral-400 mr-2" />
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        {formatDate(entry.date)}
                      </span>
                    </div>
                    <span className="text-xl">
                      {entry.mood === 'great' ? '😄' : 
                       entry.mood === 'good' ? '🙂' : 
                       entry.mood === 'neutral' ? '😐' : 
                       entry.mood === 'bad' ? '😕' : '😞'}
                    </span>
                  </div>
                  
                  {editingId === entry.id ? (
                    <div>
                      <textarea
                        className="input min-h-[120px] mb-4"
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                      />
                      <div className="flex space-x-2">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => saveEdit(entry.id)}
                          icon={<Save size={16} />}
                        >
                          Salvar
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={cancelEditing}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-neutral-700 dark:text-neutral-300 whitespace-pre-line">
                      {entry.content}
                    </p>
                  )}
                </CardBody>
                
                {editingId !== entry.id && (
                  <CardFooter className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEditing(entry)}
                      icon={<Edit2 size={16} />}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteJournalEntry(entry.id)}
                      icon={<Trash2 size={16} />}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Excluir
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ReflectPage;
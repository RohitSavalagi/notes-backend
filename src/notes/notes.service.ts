import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note, NoteCreate } from './note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
  ) {}

  async getNotes(): Promise<Note[]> {
    return this.notesRepository.find();
  }

  async createNote(note: NoteCreate): Promise<Note> {
    const newNote = this.notesRepository.create(note);
    return this.notesRepository.save(newNote);
  }

  async updateNote(id: string, note: NoteCreate): Promise<Note> {
    await this.notesRepository.update(id, note);

    const updatedNote = await this.notesRepository.findOneBy({
      id: parseInt(id),
    });

    if (!updatedNote) {
      throw new Error(`Note with id ${id} not found`);
    }

    return updatedNote;
  }

  async deleteNote(id: number): Promise<Record<string, string>> {
    const result = await this.notesRepository.delete(id);

    if (result.affected === 0) {
      return { message: 'Note not found' };
    }

    return { message: 'Noted Deleted successfully' };
  }
}

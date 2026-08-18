import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Note, type NoteCreate } from './note.entity';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async getNotes(): Promise<Note[]> {
    return this.notesService.getNotes();
  }

  @Post()
  async createNote(@Body() note: NoteCreate): Promise<Note> {
    return this.notesService.createNote(note);
  }

  @Put(':id')
  async updateNote(
    @Param('id') id: string,
    @Body() note: NoteCreate,
  ): Promise<Note> {
    return this.notesService.updateNote(id, note);
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string): Promise<Record<string, string>> {
    return this.notesService.deleteNote(Number(id));
  }
}

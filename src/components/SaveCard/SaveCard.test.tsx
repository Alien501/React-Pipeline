import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SaveCard from './SaveCard';
import { useLyricsStore } from '../../store/useLyricsStore';
import { useMusicStore } from '../../store/useMusicStore';
import { useNavStore } from '../../store/useNavStore';
import { useModalStore } from '../../store/useModalStore';

vi.mock('../../store/useLyricsStore', () => ({
  useLyricsStore: vi.fn()
}));

vi.mock('../../store/useMusicStore', () => ({
  useMusicStore: vi.fn()
}));

vi.mock('../../store/useNavStore', () => ({
  useNavStore: vi.fn()
}));

vi.mock('../../store/useModalStore', () => ({
  useModalStore: vi.fn()
}));

global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
global.URL.revokeObjectURL = vi.fn();

describe('SaveCard', () => {
  const mockResetLyrics = vi.fn();
  const mockResetMusic = vi.fn();
  const mockResetNav = vi.fn();
  const mockChangeState = vi.fn();
  
  const mockSyncedLyrics = [
    { timestamp: 10.5, lyrics: 'Test lyrics line 1', isSynced: true },
    { timestamp: 20.8, lyrics: 'Test lyrics line 2', isSynced: true }
  ];
  
  const mockWordByWordLyrics = [
    {
      lyrics: [
        { timestamp: 10.5, lyrics: 'Test' },
        { timestamp: 11.0, lyrics: 'lyrics' },
        { timestamp: 11.5, lyrics: 'line' },
        { timestamp: 12.0, lyrics: '1' }
      ]
    },
    {
      lyrics: [
        { timestamp: 20.8, lyrics: 'Test' },
        { timestamp: 21.0, lyrics: 'lyrics' },
        { timestamp: 21.5, lyrics: 'line' },
        { timestamp: 22.0, lyrics: '2' }
      ]
    }
  ];

  const mockSelectedFile = { name: 'test-song.mp3' };
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    vi.mocked(useLyricsStore).mockReturnValue({
      syncedLyrics: mockSyncedLyrics,
      resetLyrics: mockResetLyrics,
      wordByWordLyrics: mockWordByWordLyrics
    });
    
    vi.mocked(useMusicStore).mockReturnValue({
      selectedFile: mockSelectedFile,
      resetMusic: mockResetMusic
    });
    
    vi.mocked(useNavStore).mockReturnValue({
      resetNav: mockResetNav
    });
    
    vi.mocked(useModalStore).mockReturnValue({
      changeState: mockChangeState
    });

    Object.defineProperty(window, 'location', {
      value: { pathname: '/line' },
      writable: true
    });
  });

  it('renders correctly with all form fields', () => {
    render(<SaveCard />);
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/artist/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/album/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/lyricist/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/length/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/by/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sync another/i })).toBeInTheDocument();
  });

  it('updates form data when user inputs values', () => {
    render(<SaveCard />);
    
    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    expect(titleInput).toHaveValue('Test Title');
    
    const artistInput = screen.getByLabelText(/artist/i);
    fireEvent.change(artistInput, { target: { value: 'Test Artist' } });
    expect(artistInput).toHaveValue('Test Artist');
  });

//   it('triggers form submission and creates a download link', async () => {
//     const mockAnchor = document.createElement('a');
//     const clickSpy = vi.spyOn(mockAnchor, 'click').mockImplementation(() => {});
    
//     vi.spyOn(document, 'createElement').mockImplementation((tag) => {
//       if (tag === 'a') return mockAnchor;
//       return document.createElement(tag);
//     });
    
//     render(<SaveCard />);
    
//     const titleInput = screen.getByLabelText(/title/i);
//     fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    
//     const saveButton = screen.getByRole('button', { name: /save/i });
//     fireEvent.click(saveButton);
    
//     await waitFor(() => {
//       expect(URL.createObjectURL).toHaveBeenCalled();
//       expect(mockAnchor.download).toContain('test-song-line-sync.lrc');
//       expect(clickSpy).toHaveBeenCalled();
//       expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
//     });
//   });

//   it('handles Sync Another button click correctly', () => {
//     render(<SaveCard />);
    
//     const syncAnotherButton = screen.getByRole('button', { name: /sync another/i });
//     fireEvent.click(syncAnotherButton);
    
//     expect(mockResetLyrics).toHaveBeenCalled();
//     expect(mockResetMusic).toHaveBeenCalled();
//     expect(mockResetNav).toHaveBeenCalled();
//     expect(mockChangeState).toHaveBeenCalled();
//   });

//   it('sets sync mode to word when on word path', () => {
//     Object.defineProperty(window, 'location', {
//       value: { pathname: '/word' },
//       writable: true
//     });
    
//     const mockAnchor = document.createElement('a');
    
//     vi.spyOn(document, 'createElement').mockImplementation((tag) => {
//       if (tag === 'a') return mockAnchor;
//       return document.createElement(tag);
//     });
    
//     render(<SaveCard />);
    
//     const titleInput = screen.getByLabelText(/title/i);
//     fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    
//     const saveButton = screen.getByRole('button', { name: /save/i });
//     fireEvent.click(saveButton);
    
//     expect(mockAnchor.download).toContain('word-sync.lrc');
//   });
});
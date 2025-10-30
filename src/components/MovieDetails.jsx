import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { 
  Calendar, 
  Clock, 
  Film, 
  DollarSign, 
  TrendingUp, 
  Star, 
  AlertCircle 
} from "lucide-react";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${
            import.meta.env.VITE_MOVIES_API_KEY
          }`
        );
        const movieData = response.data;
        console.log(movieData);
        setMovie(movieData);
        setIsLoading(false);
      } catch (error) {
        console.log(`Error occurred while fetching the movie: ${error}`);
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
        <Header />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-64 h-96 bg-slate-700 rounded-lg mb-6"></div>
            <div className="h-8 bg-slate-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-slate-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {movie ? (
          <div className="max-w-6xl mx-auto">
            
            <div 
              className="relative h-96 rounded-3xl overflow-hidden mb-8 shadow-2xl"
              style={{
                backgroundImage: `linear-linear(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h1 className="text-4xl lg:text-6xl font-bold mb-2 text-shadow-lg">
                  {movie.original_title}
                </h1>
                {movie.tagline && (
                  <p className="text-xl lg:text-2xl text-slate-200 italic font-light">
                    "{movie.tagline}"
                  </p>
                )}
              </div>
            </div>

            
            <div className="flex flex-col lg:flex-row gap-8">
      
              <div className="lg:w-1/3 flex justify-center lg:justify-start">
                <div className="relative group">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.original_title}
                    className="w-80 h-auto rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              
              <div className="lg:w-2/3 bg-slate-800/40 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-slate-700/50">
                
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-amber-400 pl-4">Storyline</h2>
                  <p className="text-slate-200 text-lg leading-relaxed">
                    {movie.overview}
                  </p>
                </div>

                {/* Movie Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    {/* Release Date */}
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm font-medium">Release Date</p>
                        <p className="text-white font-semibold">{formatDate(movie.release_date)}</p>
                      </div>
                    </div>

                    {/* Runtime */}
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm font-medium">Runtime</p>
                        <p className="text-white font-semibold">{movie.runtime} minutes</p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center">
                        <Film className="w-6 h-6 text-violet-400" />
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm font-medium">Status</p>
                        <p className="text-white font-semibold">{movie.status}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Revenue */}
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm font-medium">Revenue</p>
                        <p className="text-white font-semibold">
                          {movie.revenue > 0 ? formatCurrency(movie.revenue) : 'Not available'}
                        </p>
                      </div>
                    </div>

                    {/* Budget */}
                    {movie.budget > 0 && (
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-rose-400" />
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm font-medium">Budget</p>
                          <p className="text-white font-semibold">{formatCurrency(movie.budget)}</p>
                        </div>
                      </div>
                    )}

                    {/* Rating */}
                    {movie.vote_average > 0 && (
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
                          <Star className="w-6 h-6 text-pink-400" />
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm font-medium">Rating</p>
                          <p className="text-white font-semibold">
                            {movie.vote_average.toFixed(1)}/10 ({movie.vote_count.toLocaleString()} votes)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Genres */}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-white mb-4">Genres</h3>
                    <div className="flex flex-wrap gap-3">
                      {movie.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="px-4 py-2 bg-slate-700/60 text-slate-200 rounded-full text-sm font-medium backdrop-blur-sm border border-slate-600/50 hover:bg-slate-600/60 transition-colors duration-200"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                <div className="mt-8 pt-6 border-t border-slate-700/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {movie.original_language && (
                      <div className="flex justify-between py-2">
                        <span className="text-slate-400">Original Language</span>
                        <span className="text-white font-medium uppercase">{movie.original_language}</span>
                      </div>
                    )}
                    {movie.production_companies && movie.production_companies.length > 0 && (
                      <div className="flex justify-between py-2">
                        <span className="text-slate-400">Production</span>
                        <span className="text-white font-medium text-right">
                          {movie.production_companies[0].name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
            <AlertCircle className="w-16 h-16 text-rose-400 mb-4" />
            <h1 className="text-3xl font-bold mb-2">Movie Not Found</h1>
            <p className="text-slate-400 text-lg">We couldn't find the movie you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
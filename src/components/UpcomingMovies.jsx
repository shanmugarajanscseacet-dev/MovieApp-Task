import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, Star, CalendarDays, ArrowRight } from "lucide-react";

const UpcomingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${
            import.meta.env.VITE_MOVIES_API_KEY
          }&page=1`
        );

        const movies = response.data.results;
        console.log(movies);
        setMovies(movies);
        setIsLoading(false);
      } catch (error) {
        console.log(`Error occurred while fetching the movies ${error}`);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate days until release
  const getDaysUntilRelease = (releaseDate) => {
    const today = new Date();
    const release = new Date(releaseDate);
    const diffTime = release - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today!";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays < 0) return "Released";
    return `${diffDays} days`;
  };

  // Get release status color
  const getReleaseStatusColor = (releaseDate) => {
    const today = new Date();
    const release = new Date(releaseDate);
    const diffDays = Math.ceil((release - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) return "bg-emerald-500/90";
    if (diffDays <= 30) return "bg-blue-500/90";
    return "bg-slate-500/90";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-700 rounded w-64 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-slate-800/50 rounded-2xl p-4">
                  <div className="w-full h-80 bg-slate-700 rounded-xl mb-4"></div>
                  <div className="h-6 bg-slate-700 rounded mb-2"></div>
                  <div className="h-4 bg-slate-700 rounded mb-1"></div>
                  <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <CalendarDays className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              Upcoming Movies
            </h1>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Get ready for the most anticipated movies coming soon to theaters
          </p>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="group bg-slate-800/40 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-500/20 border border-slate-700/50 hover:border-blue-400/30 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Movie Poster */}
              <div className="relative overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.original_title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Release Countdown Badge */}
                <div className={`absolute top-3 right-3 ${getReleaseStatusColor(movie.release_date)} backdrop-blur-sm text-white px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1`}>
                  <Clock className="w-3 h-3" />
                  {getDaysUntilRelease(movie.release_date)}
                </div>

                {/* Rating Badge */}
                {movie.vote_average > 0 && (
                  <div className="absolute top-3 left-3 bg-amber-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    {movie.vote_average.toFixed(1)}
                  </div>
                )}

                {/* Coming Soon Badge */}
                <div className="absolute bottom-3 left-3 bg-blue-500/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                  Coming Soon
                </div>
              </div>

              
              <div className="p-4">
                <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors duration-200">
                  {movie.original_title}
                </h3>
                
                <p className="text-slate-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {movie.overview}
                </p>

              
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-slate-400 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Release Date</span>
                    </div>
                    <span className="text-white font-medium">{formatDate(movie.release_date)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-slate-400 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Time Until Release</span>
                    </div>
                    <span className={`font-medium ${
                      getDaysUntilRelease(movie.release_date) === 'Today!' ? 'text-emerald-400' :
                      getDaysUntilRelease(movie.release_date) === 'Tomorrow' ? 'text-blue-400' :
                      'text-white'
                    }`}>
                      {getDaysUntilRelease(movie.release_date)}
                    </span>
                  </div>
                </div>

               
                <Link to={`/movie/${movie.id}`}>
                  <button className="w-full bg-linear-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105 active:scale-95">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

       

        {/* Empty State */}
        {movies.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <CalendarDays className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No Upcoming Movies</h3>
            <p className="text-slate-300">Check back later for new upcoming movie announcements.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingMovies;
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, TrendingUp, Star, ArrowRight } from "lucide-react";

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${
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
      month: 'short',
      day: 'numeric'
    });
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
            <div className="w-12 h-12 bg-linear-to-br from-amber-500 to-pink-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              Popular Movies
            </h1>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Discover the most talked-about and trending movies right now
          </p>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="group bg-slate-800/40 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-amber-500/20 border border-slate-700/50 hover:border-amber-400/30 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Movie Poster */}
              <div className="relative overflow-hidden">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.original_title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-amber-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  {movie.vote_average.toFixed(1)}
                </div>

                {/* Popularity Badge */}
                <div className="absolute top-3 left-3 bg-pink-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  #{movies.indexOf(movie) + 1}
                </div>
              </div>

              {/* Movie Info */}
              <div className="p-4">
                <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors duration-200">
                  {movie.original_title}
                </h3>
                
                <p className="text-slate-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {movie.overview}
                </p>

                {/* Movie Meta */}
                <div className="flex items-center justify-between text-slate-400 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(movie.release_date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>{movie.vote_count.toLocaleString()} votes</span>
                  </div>
                </div>

                {/* Action Button */}
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
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Popular Movies Found</h3>
            <p className="text-slate-300">Unable to load popular movies at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularMovies;
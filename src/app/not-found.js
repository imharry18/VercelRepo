import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fbf6f3] px-6 text-center relative overflow-hidden">
      
      {/* Glow Effect */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[30rem] h-[30rem] bg-brand-pink/20 blur-[120px] rounded-full" />
      </div>

      <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-purple-600 mb-6">
        404
      </h1>

      <h2 className="text-3xl font-bold text-slate-900 mb-4">
        Page Not Found
      </h2>

      <p className="text-slate-600 max-w-md mb-10">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <Button href="/" variant="primary" size="lg">
        Go Back Home
      </Button>
    </div>
  );
}

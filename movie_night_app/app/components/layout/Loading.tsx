export default function Loading() {
  return (
    <div className="flex  flex-1 justify-center items-center bg-base-300">
      <div>
        <div className="flex items-center justify-center py-10">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
        </div>
      </div>
    </div>
  );
}

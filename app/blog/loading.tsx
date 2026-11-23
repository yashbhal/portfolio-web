export default function BlogLoading() {
  return (
    <div className="bg-base-200 min-h-screen">
      <div className="container-responsive py-8 md:py-12 lg:py-16">
        <div className="space-y-6 md:space-y-8">
          <div className="mb-16 flex flex-col items-center gap-4">
            <div className="skeleton h-12 w-40" />
            <div className="skeleton h-1 w-24 rounded-full" />
          </div>
          <div className="grid gap-8">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="card border-base-content/10 bg-base-200/60 border"
              >
                <div className="card-body gap-3 p-6">
                  <div className="skeleton h-7 w-2/3" />
                  <div className="skeleton h-4 w-32" />
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-4 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const Stats = () => {
  return (
    <section className="relative border container rounded z-10 overflow-hidden py-24">
      <div className="mx-auto px-4 sm:container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="mx-auto mb-10 max-w-[325px] text-center lg:mb-0">
              <h3 className="mb-4 text-4xl font-bold leading-[1.2] lg:text-5xl">
                5M+
              </h3>
              <p className="text-base  sm:text-lg">
                Customers visit Gift Haven every month to get their service
                done.
              </p>
            </div>
          </div>

          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="mx-auto mb-10 max-w-[325px] text-center lg:mb-0">
              <h3 className="mb-4 text-4xl font-bold leading-[1.2] lg:text-5xl">
                92%
              </h3>
              <p className="text-base sm:text-lg">
                Satisfaction rate comes from our awesome customers.
              </p>
            </div>
          </div>

          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="mx-auto max-w-[325px] text-center">
              <h3 className="mb-4 text-4xl font-bold leading-[1.2]  lg:text-5xl">
                500+
              </h3>
              <p className="text-base  sm:text-lg">
                Average Award we have got all over internet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;

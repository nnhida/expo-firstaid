export default function Review  () {
    return (
        <section id="review" className="py-20 bg-gray-50">
            <h1 className="text-4xl text-center text-blue-600 mb-4">Patient Reviews</h1>
            <h3 className="text-2xl text-center text-gray-700 mb-12">What our patients say</h3>

            <div className="flex flex-wrap justify-center w-4/5 mx-auto">
                {[
                    {
                        name: "Alice",
                        review: "The staff was very friendly and the service was excellent!"
                    },
                    {
                        name: "Bob",
                        review: "I had a great experience. Highly recommend this facility!"
                    },
                    {
                        name: "Charlie",
                        review: "Professional and caring doctors. I felt safe and well taken care of."
                    }
                ].map((item, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-4 m-4 w-64">
                        <h3 className="text-xl text-center text-blue-600">{item.name}</h3>
                        <p className="text-center text-gray-600">{item.review}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
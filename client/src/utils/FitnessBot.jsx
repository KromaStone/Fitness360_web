import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';

const FitnessBot = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'bot',
            content: "Hi! I'm FitBot. How can I help you today?",
            options: [
                "What workout plans do you offer?",
                "How can I contact a trainer?",
                "Show me beginner-friendly exercises",
                "I want to know about pricing",
                "More help topics"
            ]
        }
    ]);

    const [currentOptions, setCurrentOptions] = useState([]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleOptionSelect = (option) => {
        // Add user's selection to messages
        setMessages(prev => [...prev, { id: prev.length + 1, sender: 'user', content: option }]);

        // Process the selected option and generate bot response
        let botResponse = {};

        switch (option) {
            case "What workout plans do you offer?":
                botResponse = {
                    content: "We offer several workout plans tailored to different fitness levels:",
                    options: [
                        "Beginner (4-week fundamentals)",
                        "Intermediate (strength building)",
                        "Advanced (performance training)",
                        "Specialized (sports-specific)"
                    ]
                };
                break;

            case "How can I contact a trainer?":
                botResponse = {
                    content: "You can contact our trainers in these ways:",
                    options: [
                        "Live chat on our website (Mon-Fri 9am-5pm)",
                        "Email: trainers@fitness360.com",
                        "Schedule a callback",
                        "Book an in-person consultation"
                    ]
                };
                break;

            case "Show me beginner-friendly exercises":
                botResponse = {
                    content: "Here are some great beginner-friendly exercise categories:",
                    options: [
                        "Full-body warm-up routine",
                        "Low-intensity cardio",
                        "Yoga & flexibility stretches",
                        "Bodyweight strength basics"
                    ]
                };
                break;

            case "I want to know about pricing":
                botResponse = {
                    content: "Our pricing options:",
                    options: [
                        "Basic plan ($19.99/month)",
                        "Premium plan ($29.99/month)",
                        "Family plan ($49.99/month)",
                        "Annual subscription (save 15%)"
                    ]
                };
                break;

            case "More help topics":
                botResponse = {
                    content: "What else would you like help with?",
                    options: [
                        "Nutrition guidance",
                        "Equipment recommendations",
                        "Progress tracking",
                        "App features"
                    ]
                };
                break;

            // Nested options
            case "Full-body warm-up routine":
                botResponse = {
                    content: "Try this 10-minute warm-up: 1) Arm circles, 2) Bodyweight squats, 3) Cat-cow stretches, 4) Jumping jacks, 5) Shoulder rolls. Repeat 2-3 times.",
                    options: ["Back to beginner exercises", "Main menu"]
                };
                break;

            case "Low-intensity cardio":
                botResponse = {
                    content: "Great low-impact options: 1) Brisk walking, 2) Cycling, 3) Swimming, 4) Elliptical machine. Aim for 20-30 minutes, 3-5 times per week.",
                    options: ["Back to beginner exercises", "Main menu"]
                };
                break;

            case "Yoga & flexibility stretches":
                botResponse = {
                    content: "Try these: 1) Child's pose, 2) Downward dog, 3) Seated forward fold, 4) Cat-cow, 5) Standing quad stretch. Hold each for 15-30 seconds.",
                    options: ["Back to beginner exercises", "Main menu"]
                };
                break;

            case "Bodyweight strength basics":
                botResponse = {
                    content: "Start with: 1) Wall push-ups, 2) Assisted squats, 3) Glute bridges, 4) Seated knee lifts. Do 2-3 sets of 8-12 reps each.",
                    options: ["Back to beginner exercises", "Main menu"]
                };
                break;

            case "Back to beginner exercises":
                return handleOptionSelect("Show me beginner-friendly exercises");

            case "Main menu":
                return handleOptionSelect(messages[0].options[0]); // Simulate clicking first option to reset

            default:
                botResponse = {
                    content: "I'm not sure I understand. Please select from the options below:",
                    options: ["Main menu", "Contact support"]
                };
        }

        // Add bot's response to messages
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: prev.length + 1,
                sender: 'bot',
                content: botResponse.content,
                options: botResponse.options
            }]);
        }, 500);
    };

    return (
        <div className="flex flex-col h-full max-w-md mx-auto bg-light dark:bg-secondary rounded-lg shadow-lg overflow-hidden border border-background/20 dark:border-light/10">
            {/* Chat header */}
            <div className="text-background dark:text-light p-4 flex items-center">
                <Icon icon="mdi:robot-happy" className="text-2xl mr-2" />
                <h2 className="text-lg font-semibold">FitBot Assistant</h2>
            </div>

            {/* Messages area */}
            <div className="flex-1 p-4 overflow-y-auto bg-light dark:bg-background">
                {messages.map((message) => (
                    <div key={message.id} className="mb-4">
                        {message.sender === 'bot' ? (
                            <div className="flex items-start">
                                <div className="bg-primary/10 dark:bg-green-100 text-light rounded-lg py-2 px-3 max-w-xs md:max-w-md">
                                    <p className="text-background">{message.content}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-end">
                                <div className="bg-blue-600 rounded-lg p-3 max-w-xs md:max-w-md">
                                    <p className="text-background dark:text-light">{message.content}</p>
                                </div>
                            </div>
                        )}

                        {/* Options */}
                        {message.options && message.sender === 'bot' && (
                            <div className="mt-2 ml-2 flex flex-wrap gap-2">
                                {message.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionSelect(option)}
                                        className="text-sm bg-primary text-blue-600 rounded-full px-3 py-1 hover:bg-blue-50 transition-colors"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div className="bg-secondlight/60 dark:bg-secondlight p-3 text-center text-xs text-background">
                Fitness360 Assistant - Select options to chat
            </div>
        </div>
    );
};

export default FitnessBot;
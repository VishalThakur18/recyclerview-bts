"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Copy,
  Check,
  ChevronDown,
  Smartphone,
  Database,
  User,
  ArrowRight,
  Code,
  Zap,
  Shield,
  TestTube,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function MVVMBlog() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {/* Hero Section */}
      <HeroSection opacity={opacity} scale={scale} />

      {/* Main Content */}
      <div className="relative z-10 bg-white">
        <IntroSection />
        <RestaurantAnalogy />
        <ThreeMusketeers />
        <CodeExamples />
        <MVVMComparison />
        <LifecycleSection />
        <SummarySection />
        <Footer />
      </div>
    </div>
  )
}

function HeroSection({ opacity, scale }: { opacity: any; scale: any }) {
  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
      style={{ opacity, scale }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Badge className="mb-6 bg-purple-500/20 text-purple-200 border-purple-500/30">
            Android Architecture Pattern
          </Badge>

          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            MVVM
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Behind the scene of MVVM
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
              onClick={() => document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start Learning
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <ChevronDown className="h-6 w-6 text-gray-400" />
      </motion.div>
    </motion.section>
  )
}

function IntroSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCards((prev) => {
        if (prev.length < 3) {
          return [...prev, prev.length]
        }
        return prev
      })
    }, 500)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="intro" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            What is <span className="text-purple-600">MVVM</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            MVVM stands for <strong>Model-View-ViewModel</strong>. It's an architectural pattern, which is just a fancy
            way of saying it's a template for organizing code in a project.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Code className="h-8 w-8" />,
              title: "Easier to Manage",
              description: "When code is separated, it's simpler to find things, fix bugs, and add new features.",
              color: "purple",
            },
            {
              icon: <TestTube className="h-8 w-8" />,
              title: "Easier to Test",
              description:
                "You can test your app's logic without needing to run the UI, making testing faster and more reliable.",
              color: "blue",
            },
            {
              icon: <Shield className="h-8 w-8" />,
              title: "Fewer Crashes",
              description:
                "MVVM works well with Android lifecycle, preventing data loss and crashes during screen rotations.",
              color: "green",
            },
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={visibleCards.includes(index) ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-${benefit.color}-100 flex items-center justify-center mb-4`}>
                    <div className={`text-${benefit.color}-600`}>{benefit.icon}</div>
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-900">The Single Most Important Goal</h3>
          <p className="text-lg text-gray-700 mb-4">
            <strong className="text-purple-600">Separation of Concerns</strong>
          </p>
          <p className="text-gray-600">
            Instead of mixing everything together (data, UI, logic), it divides the work into three distinct parts.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function RestaurantAnalogy() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null)

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            A Simple Analogy: <span className="text-purple-600">The Restaurant</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            To make this crystal clear, let's use our restaurant analogy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              id: "model",
              title: "The Model",
              subtitle: "(The Kitchen)",
              icon: <Database className="h-12 w-12" />,
              description:
                "This is your data layer. It fetches data from a database or the internet (like ingredients from a pantry). The kitchen's only job is to provide the food (data) when an order comes in. It doesn't know who the customer is.",
              color: "green",
              details: [
                "Fetches data from database/internet",
                "Provides data when requested",
                "No knowledge of UI components",
                "Pure data management",
              ],
            },
            {
              id: "view",
              title: "The View",
              subtitle: "(You, the Customer)",
              icon: <User className="h-12 w-12" />,
              description:
                "This is the UI—the Activity or Fragment that the user sees. You place an order and wait for your food. You don't care how the kitchen works; you only talk to the waiter.",
              color: "blue",
              details: [
                "User interface components",
                "Displays data to user",
                "Handles user interactions",
                "Communicates only with ViewModel",
              ],
            },
            {
              id: "viewmodel",
              title: "The ViewModel",
              subtitle: "(The Waiter)",
              icon: <Zap className="h-12 w-12" />,
              description:
                "This is the brain and the bridge. The waiter takes your order (user actions), gets the food from the kitchen (Model), and brings it to your table perfectly presented (formats data for the View).",
              color: "purple",
              details: [
                "Bridges View and Model",
                "Processes user actions",
                "Formats data for display",
                "Handles business logic",
              ],
            },
          ].map((component, index) => (
            <motion.div
              key={component.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card
                className={`h-full cursor-pointer transition-all duration-300 hover:shadow-xl ${
                  activeComponent === component.id ? "ring-2 ring-purple-500 shadow-lg" : ""
                }`}
                onClick={() => setActiveComponent(activeComponent === component.id ? null : component.id)}
              >
                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 rounded-full bg-${component.color}-100 flex items-center justify-center mx-auto mb-4`}
                  >
                    <div className={`text-${component.color}-600`}>{component.icon}</div>
                  </div>
                  <CardTitle className="text-2xl">{component.title}</CardTitle>
                  <p className={`text-${component.color}-600 font-semibold`}>{component.subtitle}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{component.description}</p>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={
                      activeComponent === component.id ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <Separator className="my-4" />
                    <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
                    <ul className="space-y-1">
                      {component.details.map((detail, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <ArrowRight className="h-3 w-3 mr-2 text-purple-500" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ThreeMusketeers() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            The Three Musketeers: <span className="text-purple-600">A Closer Look</span>
          </h2>
          <p className="text-xl text-gray-600">A detailed examination of the Model, View, and ViewModel components.</p>
        </motion.div>

        <div className="space-y-16">
          {[
            {
              number: "1",
              title: "The Model",
              description:
                'The Model is all about the data. It is not "the data" itself, but the part of your app responsible for getting and managing it.',
              whatItDoes:
                "It can fetch data from the internet (using libraries like Retrofit), a local database (using Room), or any other source.",
              keyTrait:
                'The Model is "dumb" when it comes to the UI. It has no idea that a View or ViewModel exists. It just provides data when asked.',
              color: "green",
            },
            {
              number: "2",
              title: "The View",
              description: "The View is all about the screen. It's what the user sees and touches.",
              whatItDoes:
                "Its only job is to display the data given to it by the ViewModel and to report user actions (like button clicks or text input) back to the ViewModel.",
              keyTrait:
                'The View should also be "dumb." It should not contain any business logic. If a user clicks a "Login" button, the View\'s only job is to tell the ViewModel, "Hey, the login button was clicked!"',
              color: "blue",
            },
            {
              number: "3",
              title: "The ViewModel",
              description: "The ViewModel is the brain for the UI. It connects the View and the Model.",
              whatItDoes:
                "It gets data from the Model, performs any necessary logic (like formatting a date or calculating a total), and then exposes this data for the View to display.",
              keyTrait:
                "The ViewModel is lifecycle-aware. This means it survives configuration changes. When you rotate your phone, the Activity (View) is destroyed and recreated, but the ViewModel survives, holding onto its data.",
              color: "purple",
              isSpecial: true,
            },
          ].map((component, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12`}
            >
              <div className="flex-1">
                <div className="flex items-center mb-6">
                  <div
                    className={`w-12 h-12 rounded-full bg-${component.color}-500 text-white flex items-center justify-center text-xl font-bold mr-4`}
                  >
                    {component.number}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">{component.title}</h3>
                </div>

                <p className="text-lg text-gray-700 mb-6">{component.description}</p>

                <div className="space-y-4">
                  <div className={`bg-${component.color}-50 rounded-lg p-4`}>
                    <h4 className={`font-semibold text-${component.color}-800 mb-2`}>What it does:</h4>
                    <p className="text-gray-700">{component.whatItDoes}</p>
                  </div>

                  <div
                    className={`bg-${component.color}-50 rounded-lg p-4 ${component.isSpecial ? "ring-2 ring-purple-200" : ""}`}
                  >
                    <h4 className={`font-semibold text-${component.color}-800 mb-2`}>
                      Key trait {component.isSpecial ? "(Its Superpower!)" : ""}:
                    </h4>
                    <p className="text-gray-700">{component.keyTrait}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div
                  className={`w-full h-64 bg-gradient-to-br from-${component.color}-100 to-${component.color}-200 rounded-2xl flex items-center justify-center`}
                >
                  <div className={`text-6xl font-bold text-${component.color}-400 opacity-50`}>{component.number}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MVVMSimulation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [messages, setMessages] = useState<Array<{ id: number; text: string; from: string; to: string }>>([])
  const [displayText, setDisplayText] = useState("Hello, World!")

  const steps = [
    {
      title: "Initial State",
      description: "ViewModel holds initial data, View observes it",
      action: () => {
        setMessages([])
        setDisplayText("Hello, World!")
      },
    },
    {
      title: "User Clicks Button",
      description: "View detects user interaction",
      action: () => {
        setMessages([
          {
            id: 1,
            text: "Button Clicked!",
            from: "view",
            to: "viewmodel",
          },
        ])
      },
    },
    {
      title: "ViewModel Processes",
      description: "ViewModel receives action and updates data",
      action: () => {
        setMessages((prev) => [
          ...prev,
          {
            id: 2,
            text: "Processing...",
            from: "viewmodel",
            to: "model",
          },
        ])
      },
    },
    {
      title: "Model Returns Data",
      description: "Model provides updated data to ViewModel",
      action: () => {
        setMessages((prev) => [
          ...prev,
          {
            id: 3,
            text: "Data Updated",
            from: "model",
            to: "viewmodel",
          },
        ])
      },
    },
    {
      title: "LiveData Notifies",
      description: "ViewModel notifies View through LiveData",
      action: () => {
        setMessages((prev) => [
          ...prev,
          {
            id: 4,
            text: "You clicked the button!",
            from: "viewmodel",
            to: "view",
          },
        ])
        setDisplayText("You clicked the button!")
      },
    },
    {
      title: "View Updates",
      description: "View automatically updates UI with new data",
      action: () => {
        // Final state - all messages visible
      },
    },
  ]

  const playAnimation = async () => {
    setIsPlaying(true)
    setCurrentStep(0)

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i)
      steps[i].action()
      await new Promise((resolve) => setTimeout(resolve, 1500))
    }

    setIsPlaying(false)
  }

  const resetAnimation = () => {
    setCurrentStep(0)
    setMessages([])
    setDisplayText("Hello, World!")
    setIsPlaying(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gray-800 rounded-2xl p-8 mb-12"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Interactive MVVM Communication</h3>
        <p className="text-gray-300 mb-6">Watch how the components communicate when a user clicks a button</p>

        <div className="flex justify-center gap-4 mb-6">
          <Button onClick={playAnimation} disabled={isPlaying} className="bg-purple-500 hover:bg-purple-600">
            {isPlaying ? "Playing..." : "Play Animation"}
          </Button>
          <Button
            onClick={resetAnimation}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
          >
            Reset
          </Button>
        </div>

        <div className="text-sm text-gray-400 mb-8">
          Step {currentStep + 1} of {steps.length}: <span className="text-purple-400">{steps[currentStep].title}</span>
          <br />
          {steps[currentStep].description}
        </div>
      </div>

      {/* MVVM Architecture Diagram */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Model */}
          <motion.div
            className={`bg-green-900/30 border-2 rounded-xl p-6 text-center transition-all duration-500 ${
              messages.some((m) => m.from === "model" || m.to === "model")
                ? "border-green-400 shadow-lg shadow-green-400/20"
                : "border-green-600"
            }`}
            animate={messages.some((m) => m.from === "model" || m.to === "model") ? { scale: 1.05 } : { scale: 1 }}
          >
            <Database className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-green-400 mb-2">Model</h4>
            <p className="text-sm text-gray-300">Data Layer</p>
            <div className="mt-4 text-xs text-gray-400">
              • Fetches data
              <br />• No UI knowledge
              <br />• Pure data source
            </div>
          </motion.div>

          {/* ViewModel */}
          <motion.div
            className={`bg-purple-900/30 border-2 rounded-xl p-6 text-center transition-all duration-500 ${
              messages.some((m) => m.from === "viewmodel" || m.to === "viewmodel")
                ? "border-purple-400 shadow-lg shadow-purple-400/20"
                : "border-purple-600"
            }`}
            animate={
              messages.some((m) => m.from === "viewmodel" || m.to === "viewmodel") ? { scale: 1.05 } : { scale: 1 }
            }
          >
            <Zap className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-purple-400 mb-2">ViewModel</h4>
            <p className="text-sm text-gray-300">Business Logic</p>
            <div className="mt-4 text-xs text-gray-400">
              • Processes actions
              <br />• Holds LiveData
              <br />• Lifecycle-aware
            </div>
          </motion.div>

          {/* View */}
          <motion.div
            className={`bg-blue-900/30 border-2 rounded-xl p-6 text-center transition-all duration-500 ${
              messages.some((m) => m.from === "view" || m.to === "view")
                ? "border-blue-400 shadow-lg shadow-blue-400/20"
                : "border-blue-600"
            }`}
            animate={messages.some((m) => m.from === "view" || m.to === "view") ? { scale: 1.05 } : { scale: 1 }}
          >
            <Smartphone className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-blue-400 mb-2">View</h4>
            <p className="text-sm text-gray-300">User Interface</p>
            <div className="mt-4 text-xs text-gray-400">
              • Displays data
              <br />• Handles user input
              <br />• Observes changes
            </div>
          </motion.div>
        </div>

        {/* Animated Messages */}
        <div className="relative h-32 overflow-hidden">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              className={`absolute left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-sm font-medium ${
                message.from === "view"
                  ? "bg-blue-500"
                  : message.from === "viewmodel"
                    ? "bg-purple-500"
                    : "bg-green-500"
              } text-white`}
              style={{ top: `${index * 25}px` }}
            >
              <div className="flex items-center gap-2">
                <span className="capitalize">{message.from}</span>
                <ArrowRight className="h-3 w-3" />
                <span className="capitalize">{message.to}</span>
                <span className="ml-2">"{message.text}"</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mock Phone Screen */}
        <motion.div
          className="mx-auto mt-8 w-64 h-96 bg-gray-700 rounded-3xl p-4 shadow-2xl"
          animate={currentStep >= 4 ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white rounded-2xl h-full p-6 flex flex-col justify-center items-center">
            <div className="text-center mb-8">
              <h5 className="text-lg font-bold text-gray-800 mb-4">My App</h5>
              <motion.p
                className="text-gray-600 text-sm mb-6 min-h-[40px] flex items-center justify-center"
                key={displayText}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                "{displayText}"
              </motion.p>
              <motion.button
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  currentStep === 1 ? "bg-blue-500 text-white shadow-lg scale-110" : "bg-gray-200 text-gray-700"
                }`}
                animate={currentStep === 1 ? { scale: 1.1 } : { scale: 1 }}
                whileTap={{ scale: 0.95 }}
              >
                Click Me!
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Data Flow Arrows */}
        <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
          {/* View to ViewModel Arrow */}
          {currentStep >= 1 && (
            <motion.path
              d="M 400 200 Q 350 150 300 200"
              stroke="#60A5FA"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              markerEnd="url(#arrowhead-blue)"
            />
          )}

          {/* ViewModel to Model Arrow */}
          {currentStep >= 2 && (
            <motion.path
              d="M 250 200 Q 200 150 150 200"
              stroke="#A78BFA"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1 }}
              markerEnd="url(#arrowhead-purple)"
            />
          )}

          {/* Model to ViewModel Arrow */}
          {currentStep >= 3 && (
            <motion.path
              d="M 150 250 Q 200 300 250 250"
              stroke="#34D399"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              markerEnd="url(#arrowhead-green)"
            />
          )}

          {/* ViewModel to View Arrow */}
          {currentStep >= 4 && (
            <motion.path
              d="M 300 250 Q 350 300 400 250"
              stroke="#A78BFA"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 2 }}
              markerEnd="url(#arrowhead-purple)"
            />
          )}

          {/* Arrow markers */}
          <defs>
            <marker id="arrowhead-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#60A5FA" />
            </marker>
            <marker id="arrowhead-purple" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#A78BFA" />
            </marker>
            <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#34D399" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* Key Concepts */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-gray-700/50 rounded-lg p-4">
          <h5 className="font-bold text-purple-400 mb-2">🔍 Observability</h5>
          <p className="text-sm text-gray-300">
            The View "watches" the ViewModel's LiveData. When data changes, the View is automatically notified.
          </p>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-4">
          <h5 className="font-bold text-purple-400 mb-2">🔄 Reactive Updates</h5>
          <p className="text-sm text-gray-300">
            No manual UI updates needed! The View reacts to data changes automatically through the observer pattern.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function CodeExamples() {
  return (
    <section className="py-20 px-6 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Behind the Scenes: <span className="text-purple-400">How They Talk</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The "magic" that connects the View and ViewModel is a concept called{" "}
            <strong className="text-purple-400">observability</strong>. The View observes (watches) data in the
            ViewModel using LiveData or StateFlow.
          </p>
        </motion.div>

        {/* Interactive MVVM Communication Simulation */}
        <MVVMSimulation />

        <div className="space-y-12 mt-16">
          <CodeBlock
            title="1. The ViewModel with LiveData"
            language="kotlin"
            code={`// Import necessary libraries
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

// This is our ViewModel
class MyViewModel : ViewModel() {
    // This is the private, changeable data. Only the ViewModel can change it.
    // We start it with a default message.
    private val _messageForUI = MutableLiveData<String>("Hello, World!")
    
    // This is the public, non-changeable data that the View will watch.
    // The View can read it, but can't change it.
    val messageForUI: LiveData<String> = _messageForUI
    
    // A function the View can call, for example, when a button is clicked.
    fun onButtonClicked() {
        // We change the data here
        _messageForUI.value = "You clicked the button!"
    }
}`}
          />

          <CodeBlock
            title="2. The View (Activity) that observes the ViewModel"
            language="kotlin"
            code={`// Import necessary libraries
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.lifecycle.ViewModelProvider
import android.widget.TextView
import android.widget.Button

// This is our View
class MainActivity : AppCompatActivity() {
    private lateinit var myViewModel: MyViewModel
    private lateinit var myTextView: TextView
    private lateinit var myButton: Button
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        // Find our UI elements
        myTextView = findViewById(R.id.my_text_view)
        myButton = findViewById(R.id.my_button)
        
        // Get an instance of our ViewModel
        myViewModel = ViewModelProvider(this).get(MyViewModel::class.java)
        
        // *** THIS IS THE MAGIC! ***
        // We start observing the data. The code inside the brackets
        // will run automatically whenever the data changes.
        myViewModel.messageForUI.observe(this) { newMessage ->
            // Update the text view with the new message
            myTextView.text = newMessage
        }
        
        // Tell the ViewModel when the user clicks the button
        myButton.setOnClickListener {
            myViewModel.onButtonClicked()
        }
    }
}`}
          />
        </div>
      </div>
    </section>
  )
}

function CodeBlock({ title, language, code }: { title: string; language: string; code: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gray-800 rounded-2xl overflow-hidden"
    >
      <div className="flex items-center justify-between p-4 bg-gray-700">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="text-gray-300 hover:text-white hover:bg-gray-600"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
      <div className="p-6">
        <pre className="text-sm text-gray-300 overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
    </motion.div>
  )
}

function MVVMComparison() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            MVVM vs. Others: <span className="text-purple-600">Pattern Evolution</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            MVVM wasn't the first pattern. It evolved from others, mainly MVC and MVP.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-center">MVC (Model-View-Controller)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  The Controller takes user input and updates both the Model and the View. The View and Model are often
                  tightly coupled, making it messy for complex Android UIs.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-center">MVP (Model-View-Presenter)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  The Presenter is like a more hands-on ViewModel. It gets data from the Model and manually tells the
                  View exactly what to display. This creates a strong link between the View and Presenter.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <tr>
                <th className="p-4 text-left">Feature</th>
                <th className="p-4 text-left">MVP (Model-View-Presenter)</th>
                <th className="p-4 text-left">MVVM (Model-View-ViewModel)</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  feature: "View-Logic Link",
                  mvp: "Presenter holds a direct reference to the View (view.showData()). They are tightly coupled.",
                  mvvm: "ViewModel exposes data streams (LiveData). View subscribes to them. They are loosely coupled.",
                },
                {
                  feature: "Lifecycle Awareness",
                  mvp: "The Presenter is not naturally lifecycle-aware. You have to manually save its state.",
                  mvvm: "The ViewModel is lifecycle-aware by design. It survives configuration changes automatically.",
                },
                {
                  feature: "Testability",
                  mvp: "Good. You can test the Presenter by mocking the View.",
                  mvvm: "Excellent. You can test the ViewModel without any reference to the View, making tests cleaner.",
                },
                {
                  feature: "Who is more optimized?",
                  mvp: "For modern Android, MVVM is generally more optimized because its lifecycle awareness and loose coupling solve common Android problems more elegantly.",
                  mvvm: "MVVM handles Android lifecycle events (like screen rotations) more elegantly and with less boilerplate code.",
                },
              ].map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="p-4 font-semibold text-purple-600">{row.feature}</td>
                  <td className="p-4 text-gray-700">{row.mvp}</td>
                  <td className="p-4 text-gray-700">{row.mvvm}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}

function ViewModelLifecycleSimulation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activityState, setActivityState] = useState("alive")
  const [viewModelState, setViewModelState] = useState("alive")
  const [userData, setUserData] = useState(["Photo 1", "Photo 2", "Photo 3", "Photo 4", "Photo 5"])
  const [isRotating, setIsRotating] = useState(false)

  const steps = [
    {
      title: "Normal State",
      description: "App is running normally. Activity and ViewModel are both alive with user data loaded.",
      action: () => {
        setActivityState("alive")
        setViewModelState("alive")
        setUserData(["Photo 1", "Photo 2", "Photo 3", "Photo 4", "Photo 5"])
        setIsRotating(false)
      },
    },
    {
      title: "User Rotates Phone",
      description: "User rotates the device. This triggers a configuration change.",
      action: () => {
        setIsRotating(true)
      },
    },
    {
      title: "Activity Destroyed",
      description: "Android destroys the current Activity to handle the rotation.",
      action: () => {
        setActivityState("destroyed")
        setViewModelState("alive") // ViewModel survives!
      },
    },
    {
      title: "New Activity Created",
      description: "Android creates a new Activity for the new orientation.",
      action: () => {
        setActivityState("recreated")
        setViewModelState("alive")
        setIsRotating(false)
      },
    },
    {
      title: "Data Restored Instantly",
      description: "The new Activity connects to the existing ViewModel and gets all data instantly!",
      action: () => {
        setActivityState("alive")
        setViewModelState("alive")
        // Data is still there!
      },
    },
  ]

  const playLifecycleDemo = async () => {
    setIsPlaying(true)
    setCurrentStep(0)

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i)
      steps[i].action()
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }

    setIsPlaying(false)
  }

  const resetDemo = () => {
    setCurrentStep(0)
    setActivityState("alive")
    setViewModelState("alive")
    setUserData(["Photo 1", "Photo 2", "Photo 3", "Photo 4", "Photo 5"])
    setIsRotating(false)
    setIsPlaying(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 mb-16"
    >
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-white mb-4">📱 Interactive Lifecycle Demo</h3>
        <p className="text-gray-300 mb-6">
          Watch what happens when you rotate your phone and see why ViewModel is so powerful!
        </p>

        <div className="flex justify-center gap-4 mb-6">
          <Button onClick={playLifecycleDemo} disabled={isPlaying} className="bg-purple-500 hover:bg-purple-600">
            {isPlaying ? "Playing Demo..." : "▶️ Play Lifecycle Demo"}
          </Button>
          <Button
            onClick={resetDemo}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
          >
            🔄 Reset
          </Button>
        </div>

        <div className="text-sm text-gray-400 mb-8 bg-gray-700/50 rounded-lg p-4">
          <div className="font-semibold text-purple-400">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
          </div>
          <div className="mt-2">{steps[currentStep].description}</div>
        </div>
      </div>

      {/* Main Simulation Area */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Phone Visualization */}
        <div className="flex flex-col items-center">
          <h4 className="text-xl font-bold text-white mb-6">📱 Your Phone</h4>

          <motion.div
            className="relative"
            animate={{
              rotate: isRotating ? [0, 90] : 0,
              scale: isRotating ? [1, 0.8, 1] : 1,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            {/* Phone Frame */}
            <div className="w-64 h-96 bg-gray-700 rounded-3xl p-4 shadow-2xl border-4 border-gray-600">
              {/* Screen */}
              <motion.div
                className={`w-full h-full rounded-2xl p-4 transition-all duration-500 ${
                  activityState === "destroyed"
                    ? "bg-red-900/50 border-2 border-red-500"
                    : activityState === "recreated"
                      ? "bg-green-900/50 border-2 border-green-500"
                      : "bg-white"
                }`}
                animate={activityState === "destroyed" ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
                transition={{ duration: 0.5, repeat: activityState === "destroyed" ? 3 : 0 }}
              >
                {activityState === "destroyed" ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-red-300">
                      <div className="text-4xl mb-2">💥</div>
                      <div className="font-bold">Activity Destroyed!</div>
                      <div className="text-sm mt-2">
                        All UI data would be lost
                        <br />
                        in traditional approaches
                      </div>
                    </div>
                  </div>
                ) : activityState === "recreated" ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-green-300">
                      <div className="text-4xl mb-2">✨</div>
                      <div className="font-bold">New Activity Created!</div>
                      <div className="text-sm mt-2">Connecting to ViewModel...</div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full">
                    <div className="text-center mb-4">
                      <h5 className="text-lg font-bold text-gray-800">Photo Gallery</h5>
                      <div className="text-sm text-gray-600">{userData.length} photos loaded</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 h-3/4">
                      {userData.map((photo, index) => (
                        <motion.div
                          key={photo}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg flex items-center justify-center text-xs font-medium text-gray-700"
                        >
                          {photo}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Activity Status */}
          <motion.div
            className={`mt-4 px-4 py-2 rounded-full text-sm font-bold ${
              activityState === "destroyed"
                ? "bg-red-500/20 text-red-300 border border-red-500"
                : activityState === "recreated"
                  ? "bg-green-500/20 text-green-300 border border-green-500"
                  : "bg-blue-500/20 text-blue-300 border border-blue-500"
            }`}
            animate={{ scale: activityState !== "alive" ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.5, repeat: activityState !== "alive" ? 2 : 0 }}
          >
            Activity:{" "}
            {activityState === "alive" ? "Running" : activityState === "destroyed" ? "Destroyed" : "Recreated"}
          </motion.div>
        </div>

        {/* ViewModel Visualization */}
        <div className="flex flex-col items-center">
          <h4 className="text-xl font-bold text-white mb-6">🧠 ViewModel (The Hero)</h4>

          <motion.div
            className={`w-64 h-64 rounded-2xl p-6 border-4 transition-all duration-500 ${
              viewModelState === "alive"
                ? "bg-purple-900/30 border-purple-400 shadow-lg shadow-purple-400/20"
                : "bg-gray-700 border-gray-500"
            }`}
            animate={
              viewModelState === "alive"
                ? {
                    boxShadow: [
                      "0 0 20px rgba(168, 85, 247, 0.4)",
                      "0 0 40px rgba(168, 85, 247, 0.6)",
                      "0 0 20px rgba(168, 85, 247, 0.4)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="text-center h-full flex flex-col justify-center">
              <motion.div
                className="text-6xl mb-4"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                🛡️
              </motion.div>

              <div className="text-purple-300 font-bold mb-2">ViewModel Status</div>
              <div className={`text-sm ${viewModelState === "alive" ? "text-green-300" : "text-gray-400"}`}>
                {viewModelState === "alive" ? "✅ ALIVE & PROTECTING DATA" : "❌ Destroyed"}
              </div>

              <div className="mt-4 text-xs text-gray-300">
                <div className="font-semibold mb-1">Protected Data:</div>
                <div className="bg-purple-800/30 rounded p-2">
                  {userData.length} photos safe
                  <br />
                  User preferences ✓
                  <br />
                  App state ✓
                </div>
              </div>
            </div>
          </motion.div>

          {/* ViewModel Status */}
          <motion.div
            className="mt-4 px-4 py-2 rounded-full text-sm font-bold bg-purple-500/20 text-purple-300 border border-purple-500"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          >
            ViewModel: Survives Everything! 💪
          </motion.div>
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <motion.div
          className="bg-red-900/20 border border-red-500/30 rounded-xl p-6"
          animate={currentStep === 2 ? { scale: [1, 1.02, 1] } : { scale: 1 }}
          transition={{ duration: 0.5, repeat: currentStep === 2 ? 3 : 0 }}
        >
          <div className="text-center">
            <div className="text-3xl mb-3">😱</div>
            <h5 className="text-xl font-bold text-red-400 mb-3">Without ViewModel</h5>
            <div className="text-sm text-gray-300 space-y-2">
              <div>📱 Phone rotates</div>
              <div>💥 Activity destroyed</div>
              <div>📊 All data lost</div>
              <div>🔄 Must reload everything</div>
              <div>⏳ User waits again</div>
              <div>😞 Poor experience</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-green-900/20 border border-green-500/30 rounded-xl p-6"
          animate={currentStep >= 3 ? { scale: [1, 1.02, 1] } : { scale: 1 }}
          transition={{ duration: 0.5, repeat: currentStep >= 3 ? 3 : 0 }}
        >
          <div className="text-center">
            <div className="text-3xl mb-3">🎉</div>
            <h5 className="text-xl font-bold text-green-400 mb-3">With ViewModel</h5>
            <div className="text-sm text-gray-300 space-y-2">
              <div>📱 Phone rotates</div>
              <div>🛡️ ViewModel survives</div>
              <div>💾 Data preserved</div>
              <div>⚡ Instant reconnection</div>
              <div>🚀 No waiting time</div>
              <div>😊 Smooth experience</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Key Insights */}
      <div className="mt-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-500/30">
        <h5 className="text-xl font-bold text-purple-300 mb-4 text-center">🔑 Key Insights</h5>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl mb-2">🔄</div>
            <div className="font-semibold text-purple-300">Lifecycle Aware</div>
            <div className="text-gray-300">ViewModel knows about Activity lifecycle</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">💾</div>
            <div className="font-semibold text-purple-300">Data Persistence</div>
            <div className="text-gray-300">Survives configuration changes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">⚡</div>
            <div className="font-semibold text-purple-300">Performance</div>
            <div className="text-gray-300">No need to reload data</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function LifecycleSection() {
  const [isRotated, setIsRotated] = useState(false)

  return (
    <section className="py-20 px-6 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The <span className="text-purple-400">Core Thing</span>: ViewModel's Superpower
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            While separating concerns is the goal, the single most important technical feature that makes MVVM so
            powerful is that the ViewModel is <strong className="text-purple-400">lifecycle-aware</strong>.
          </p>
        </motion.div>

        {/* Add the new simulation here */}
        <ViewModelLifecycleSimulation />

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-red-900/20 border-red-500/30 text-white h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-red-400">The Problem: The Fragile Android UI</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Think of your app's screen (the Activity or Fragment). The Android operating system can be very
                  ruthless with it. It will destroy and recreate your screen for many reasons:
                </p>
                <ul className="space-y-2">
                  {[
                    "When you rotate the phone",
                    "When you change the phone's language",
                    "When the OS needs memory for another app",
                    "When the screen is destroyed, any data you were holding in it is gone. Poof.",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center text-gray-300"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 text-red-400" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-green-900/20 border-green-500/30 text-white h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-green-400">The MVVM Solution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>The ViewModel solves this perfectly. It is designed to survive these screen destructions.</p>
                <div className="bg-green-800/30 rounded-lg p-4">
                  <h4 className="font-semibold text-green-300 mb-2">ViewModel's Lifecycle:</h4>
                  <ul className="space-y-2">
                    {[
                      "Lives longer than the screen",
                      "Survives configuration changes",
                      "Preserves data automatically",
                      "No need to re-fetch data",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center text-gray-300"
                      >
                        <ArrowRight className="h-4 w-4 mr-2 text-green-400" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-8">Simple Demo: Screen Rotation</h3>
          <div className="flex flex-col items-center space-y-8">
            <motion.div
              className="relative"
              animate={{ rotate: isRotated ? 90 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <Smartphone className="h-32 w-32 text-purple-400" />
            </motion.div>

            <Button onClick={() => setIsRotated(!isRotated)} className="bg-purple-500 hover:bg-purple-600">
              {isRotated ? "Rotate Back" : "Rotate Phone"}
            </Button>

            <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
              <Card className="bg-red-900/20 border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-red-400">Without ViewModel</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p>📱 Activity destroyed → 💥 Data lost → 🔄 Re-fetch everything → 😞 Poor UX</p>
                </CardContent>
              </Card>

              <Card className="bg-green-900/20 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-green-400">With ViewModel</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p>📱 Activity destroyed → 💾 ViewModel survives → ⚡ Instant data → 😊 Great UX</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function SummarySection() {
  const [visibleConcepts, setVisibleConcepts] = useState<number[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleConcepts((prev) => {
        if (prev.length < 5) {
          return [...prev, prev.length]
        }
        return prev
      })
    }, 300)

    return () => clearInterval(timer)
  }, [])

  const concepts = [
    {
      title: "Separation of Concerns",
      description: "Keep UI, logic, and data code in separate places.",
    },
    {
      title: "ViewModel",
      description: "A lifecycle-aware component for holding and processing UI-related data.",
    },
    {
      title: "LiveData/StateFlow",
      description: "Observable data holders that the View can watch for changes.",
    },
    {
      title: "Reactivity",
      description: "The View reacts to data changes automatically, rather than being manually told what to do.",
    },
    {
      title: "Testability",
      description: "Logic in the ViewModel can be tested easily, independent of the Android framework.",
    },
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Summary & <span className="text-purple-600">Core Ideas</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-12"
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Summary:</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            MVVM is a powerful architectural pattern that separates your app into three parts: the{" "}
            <strong className="text-purple-600">Model</strong> (data), the{" "}
            <strong className="text-blue-600">View</strong> (UI), and the{" "}
            <strong className="text-green-600">ViewModel</strong> (UI logic). The ViewModel acts as a bridge, preparing
            data for the View and handling user input. It uses observable data holders like LiveData or StateFlow so
            that the View can reactively update itself when data changes. This pattern is highly recommended by Google
            for modern Android development because it creates clean, highly testable, and robust apps that gracefully
            handle lifecycle events like screen rotation.
          </p>
        </motion.div>

        <div>
          <h3 className="text-2xl font-bold mb-8 text-gray-900 text-center">Core Concepts:</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {concepts.map((concept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={visibleConcepts.includes(index) ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-600">{concept.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{concept.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Continue Learning Android Development</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to dive deeper into Android development? Check out our comprehensive RecyclerView tutorial!
          </p>

          <div className="flex justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0"
              onClick={() => window.open("https://recyclerview-bts.vercel.app/", "_blank")}
            >
              📱 Learn RecyclerView - Behind The Scene
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <Separator className="my-8 bg-gray-700" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© 2024 MVVM Tutorial. Built with Next.js and Framer Motion.</p>
            <div className="flex space-x-6">
              <a
                href="https://recyclerview-bts.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                RecyclerView Tutorial
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                More Tutorials
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

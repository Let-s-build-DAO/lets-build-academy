# LB Academy

> **The world's first interactive blockchain learning operating system.**

Not a course platform. Not a bootcamp. Not a certification website.

An operating system for developing blockchain intuition.

---

## What Makes It Different

| YouTube / Generic Platforms | LB Academy |
|---|---|
| Videos | Interactive simulations |
| Generic AI | Atlas — contextual Socratic mentor |
| Passive watching | Active experimentation |
| Isolated learning | Builder Pods + peer reviews |
| Tutorials | First-principles thinking |
| Quizzes | Real-world build challenges |
| Completion certificates | Portfolio, contributions, demonstrated capability |
| Content-first | Transformation-first |

---

## The Learning Philosophy

### 1. Think Before You're Taught
Every lesson begins with a problem, never a definition. The learner discovers the need before learning the name.

### 2. Learn by Experimentation
Every concept is interactive — not optional, mandatory. Learners operate live simulations to discover how systems behave.

### 3. Build Every Week
Every world ends with a build challenge: design a protocol, write a governance proposal, model token economics, implement a contract.

### 4. AI Should Teach, Not Answer
Atlas is a Socratic mentor. It improves thinking, never gives the solution directly.

---

## The Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** Firestore
- **Auth:** Firebase Auth
- **Animations:** Framer Motion
- **Crypto primitives:** `@stablelib/sha256`, `@noble/curves`
- **State:** Jotai
- **Styling:** Tailwind CSS

---

## Local Development

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000`.

Seed the first World: navigate to `/seed-v2` and click **Seed**.

---

## Project Structure

```
src/
  app/                    # Next.js App Router pages
  components/
    engine/               # LessonJourneyEngine — the core learning loop
    steps/                # Step components: HookStep, SimulationStep, ExplanationStep…
    widgets/              # Live interactive widgets: HashLiveInput, NonceScrubber…
    lesson/               # Shell chrome: LessonPlayerShell, progress bar
    views/                # V2CourseEngine (legacy), WorldMap
    simulations/          # Standalone simulations
    interactions/         # Legacy interaction types (being migrated)
  hooks/
  store/
  firebase/
```

---

## Curriculum

See [CURRICULUM.md](./CURRICULUM.md) for the full World-based curriculum.

See [INTERACTIVITY.md](./INTERACTIVITY.md) for the widget library and interaction design spec.

---

## Builder Progression

```
Explorer → Apprentice → Builder → Architect → Protocol Designer → Research Fellow → Mentor
```

XP earned through: simulation completion, first-attempt Final Challenges, Micro Builds, Atlas engagement, Builder Pod peer reviews.

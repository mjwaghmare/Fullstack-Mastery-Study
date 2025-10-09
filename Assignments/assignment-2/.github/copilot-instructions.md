# AI Flutter Development Instructions

## Project Overview
This is a Flutter application that follows modern development practices and Material Design principles. The project uses Flutter's latest features including null safety, async/await patterns, and widget composition.

## Development Environment

### Common Commands
```bash
flutter pub get     # Install dependencies
flutter run        # Run the app in development
flutter build      # Build for production
flutter test       # Run tests
flutter analyze    # Static code analysis
```

## Flutter Architecture & Best Practices

### Project Structure
```
lib/
├── main.dart              # Application entry point
├── app/                   # App-level configs & routes
├── features/             # Feature-based modules
├── core/                 # Shared utilities & constants
├── widgets/             # Reusable widgets
└── models/              # Data models
```

### Code Quality Guidelines

#### Widget Structure
- Prefer `StatelessWidget` when possible
- Keep widget methods small and focused
- Extract reusable widgets into separate files
- Use `const` constructors when possible

```dart
class NewsCard extends StatelessWidget {
  const NewsCard({
    super.key,
    required this.title,
    required this.description,
  });

  final String title;
  final String description;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: 8),
            Text(description),
          ],
        ),
      ),
    );
  }
}
```

### State Management
- Use `setState` for simple local state
- Consider Provider/Riverpod for complex state
- Keep business logic separate from UI
- Use `ValueNotifier` for simple reactive state

### Error Handling
- Handle all async operations with try-catch
- Show user-friendly error messages
- Use error boundaries where appropriate
- Log errors for debugging

### Navigation
- Use named routes for main navigation
- Handle deep links appropriately
- Implement proper back button behavior
- Use GoRouter for complex navigation

### Testing
- Write widget tests for UI components
- Unit test business logic
- Integration tests for critical flows
- Use `flutter_test` package for testing

## UI/UX Guidelines

### Material Design
- Follow Material Design 3 principles
- Use proper spacing and typography
- Implement proper touch targets (48x48dp minimum)
- Support both light and dark themes

### Responsive Design
- Use `LayoutBuilder` for responsive layouts
- Support different screen sizes
- Handle orientation changes
- Consider tablet layouts

### Accessibility
- Provide meaningful labels for screen readers
- Ensure proper contrast ratios
- Support text scaling
- Handle RTL layouts

### Performance
- Minimize rebuilds using `const` widgets
- Use `ListView.builder` for long lists
- Optimize image loading and caching
- Profile performance regularly

## Asset Management
```yaml
flutter:
  assets:
    - assets/images/
    - assets/icons/
  fonts:
    - family: CustomFont
      fonts:
        - asset: assets/fonts/CustomFont-Regular.ttf
        - asset: assets/fonts/CustomFont-Bold.ttf
          weight: 700
```

## Common Tasks

### Adding New Features
1. Create feature folder in `lib/features/`
2. Implement feature-specific widgets
3. Add route to navigation system
4. Write tests for new features

### Styling
- Use `ThemeData` for consistent styling
- Define custom themes in `lib/app/theme/`
- Use proper text styles from theme
- Maintain consistent spacing

### Data Management
- Use proper data models
- Implement repository pattern
- Handle API calls in services
- Cache data appropriately

## Documentation
- Document all public APIs
- Add comments for complex logic
- Keep README updated
- Include setup instructions

This guide should be updated as the project evolves and new patterns emerge.
//
//  SuffixWrapper.swift
//  ExpenseTracker
//
//  Created by mondo on 2022/12/27.
//

@propertyWrapper struct Suffix: Equatable {
    var wrappedValue: Double
    private let suffix: String
    
    init(wrappedValue: Double, _ suffix: String) {
        self.wrappedValue = wrappedValue
        self.suffix = suffix
    }
    
    var projectedValue: String {
        wrappedValue.formatted() + " \(suffix)"
    }
}
